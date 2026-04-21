import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsInView(true); obs.unobserve(el) } },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px', ...options }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return [ref, isInView]
}

export function useCounter(end, duration = 2000, start = 0, decimals = 0) {
  const [count, setCount] = useState(decimals ? Number(start).toFixed(decimals) : start)
  const [go, setGo] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setGo(true); obs.unobserve(el) } },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!go) return
    let t0
    const step = (ts) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      const currentVal = start + (end - start) * (1 - Math.pow(1 - p, 3))
      setCount(decimals ? currentVal.toFixed(decimals) : Math.floor(currentVal))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [go, end, duration, start, decimals])

  return [ref, count]
}
