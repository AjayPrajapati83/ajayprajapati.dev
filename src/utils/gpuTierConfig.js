/**
 * Adaptive rendering configuration based on GPU tier
 * Tier 0-1: Low-end — minimal effects
 * Tier 2: Standard — balanced
 * Tier 3: High-end — all effects
 */
export function getSceneConfig(tier) {
  return {
    particles: tier >= 2 ? 800 : tier === 1 ? 300 : 100,
    hexCount: tier >= 2 ? 54 : 30,
    connectionArcs: tier >= 2 ? 18 : tier === 1 ? 10 : 6,
    enablePostProcessing: tier >= 3,
    pixelRatio: Math.min(window.devicePixelRatio, tier >= 2 ? 1.5 : 1),
    shadowsEnabled: tier >= 2,
    antialias: tier >= 2,
  }
}
