// La API escucha solo en loopback: el trafico publico entra por el proxy del servidor web. Con '0.0.0.0' el puerto
// respondia directo desde internet por HTTP sin cifrar (medido el 2026-10-31: 72.249.68.148:6015 -> shinetogo-api).
const { test } = require('node:test')
const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { join } = require('node:path')

const server = readFileSync(join(__dirname, '..', 'server.js'), 'utf8')

test('escucha en HOST, por defecto 127.0.0.1, nunca en 0.0.0.0', () => {
  assert.match(server, /const HOST = process\.env\.HOST \|\| '127\.0\.0\.1'/)
  assert.match(server, /app\.listen\(PORT, HOST,/)
  assert.doesNotMatch(server, /'0\.0\.0\.0'/)
})
