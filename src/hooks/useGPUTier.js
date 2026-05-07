import { useState, useEffect } from 'react'
import { getGPUTier } from 'detect-gpu'

export function useGPUTier() {
  const [gpuInfo, setGpuInfo] = useState({ tier: 2, isMobile: false, loading: true })

  useEffect(() => {
    let cancelled = false

    async function detect() {
      try {
        const result = await getGPUTier()
        if (!cancelled) {
          setGpuInfo({
            tier: result.tier,
            isMobile: result.isMobile || false,
            loading: false,
          })
        }
      } catch (err) {
        console.warn('GPU detection failed, using defaults:', err)
        if (!cancelled) {
          setGpuInfo({ tier: 2, isMobile: false, loading: false })
        }
      }
    }

    detect()
    return () => { cancelled = true }
  }, [])

  return gpuInfo
}
