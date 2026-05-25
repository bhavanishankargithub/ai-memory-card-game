import { useCallback, useEffect, useRef } from 'react'

/**
 * Single active timeout with generation tokens so stale callbacks
 * never run after clear, reschedule, or unmount.
 */
export function useTimer() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const generationRef = useRef(0)

  const clearScheduled = useCallback(() => {
    generationRef.current += 1
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const schedule = useCallback(
    (callback: () => void, delayMs: number) => {
      clearScheduled()
      const generation = generationRef.current

      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null
        if (generation !== generationRef.current) return
        callback()
      }, delayMs)
    },
    [clearScheduled],
  )

  useEffect(() => clearScheduled, [clearScheduled])

  return { schedule, clearScheduled }
}
