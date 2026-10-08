// Transcodifica un video a MP4 H.264 + AAC para web, con control de lado largo y bitrate.
// Solo macOS (AVFoundation). Uso: swift scripts/transcode-video.swift <entrada> <salida.mp4> <ladoLargoPx> <kbps>
import AVFoundation
import Foundation

let args = CommandLine.arguments
guard args.count >= 5, let maxLongValue = Double(args[3]), let kbps = Int(args[4]) else {
    print("uso: transcode-video <entrada> <salida.mp4> <ladoLargoPx> <kbps>")
    exit(2)
}
let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])
let maxLong = CGFloat(maxLongValue)
try? FileManager.default.removeItem(at: outURL)

let asset = AVURLAsset(url: inURL)
let done = DispatchSemaphore(value: 0)
var failure: String?

Task {
    do {
        guard let vTrack = try await asset.loadTracks(withMediaType: .video).first else { throw NSError(domain: "t", code: 1, userInfo: [NSLocalizedDescriptionKey: "sin pista de video"]) }
        let aTrack = try await asset.loadTracks(withMediaType: .audio).first
        let raw = try await vTrack.load(.naturalSize)
        let tf = try await vTrack.load(.preferredTransform)
        let shown = raw.applying(tf)
        let scale = min(1, maxLong / max(abs(shown.width), abs(shown.height)))
        func even(_ v: CGFloat) -> Int { max(2, Int((v * scale / 2).rounded()) * 2) }
        let outW = even(raw.width), outH = even(raw.height)

        let reader = try AVAssetReader(asset: asset)
        let vOut = AVAssetReaderTrackOutput(track: vTrack, outputSettings: [
            kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_420YpCbCr8BiPlanarVideoRange
        ])
        reader.add(vOut)
        var aOut: AVAssetReaderTrackOutput?
        if let a = aTrack {
            let o = AVAssetReaderTrackOutput(track: a, outputSettings: [AVFormatIDKey: kAudioFormatLinearPCM])
            reader.add(o)
            aOut = o
        }

        let writer = try AVAssetWriter(outputURL: outURL, fileType: .mp4)
        let vIn = AVAssetWriterInput(mediaType: .video, outputSettings: [
            AVVideoCodecKey: AVVideoCodecType.h264,
            AVVideoWidthKey: outW,
            AVVideoHeightKey: outH,
            AVVideoScalingModeKey: AVVideoScalingModeResizeAspect,
            AVVideoCompressionPropertiesKey: [
                AVVideoAverageBitRateKey: kbps * 1000,
                AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
                AVVideoMaxKeyFrameIntervalKey: 48,
                AVVideoExpectedSourceFrameRateKey: 30,
            ],
        ])
        vIn.transform = tf
        vIn.expectsMediaDataInRealTime = false
        writer.add(vIn)
        var aIn: AVAssetWriterInput?
        if aOut != nil {
            let i = AVAssetWriterInput(mediaType: .audio, outputSettings: [
                AVFormatIDKey: kAudioFormatMPEG4AAC, AVNumberOfChannelsKey: 2, AVSampleRateKey: 44100, AVEncoderBitRateKey: 64000,
            ])
            i.expectsMediaDataInRealTime = false
            writer.add(i)
            aIn = i
        }
        writer.shouldOptimizeForNetworkUse = true // moov al inicio: reproduce sin descargar todo

        guard reader.startReading() else { throw reader.error ?? NSError(domain: "t", code: 2) }
        writer.startWriting()
        writer.startSession(atSourceTime: .zero)

        let group = DispatchGroup()
        func pump(_ input: AVAssetWriterInput, _ output: AVAssetReaderOutput, _ label: String) {
            group.enter()
            input.requestMediaDataWhenReady(on: DispatchQueue(label: label)) {
                while input.isReadyForMoreMediaData {
                    if let buffer = output.copyNextSampleBuffer() {
                        input.append(buffer)
                    } else {
                        input.markAsFinished()
                        group.leave()
                        return
                    }
                }
            }
        }
        pump(vIn, vOut, "video")
        if let i = aIn, let o = aOut { pump(i, o, "audio") }
        await withCheckedContinuation { (c: CheckedContinuation<Void, Never>) in
            group.notify(queue: .global()) { c.resume() }
        }
        await writer.finishWriting()
        if writer.status != .completed { throw writer.error ?? NSError(domain: "t", code: 3) }
        print("OK \(outW)x\(outH) \(kbps)kbps -> \(outURL.lastPathComponent)")
    } catch {
        failure = "\(error)"
    }
    done.signal()
}
done.wait()
if let f = failure { print("ERROR: \(f)"); exit(1) }
