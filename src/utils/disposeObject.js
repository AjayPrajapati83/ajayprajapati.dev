/**
 * Recursively disposes Three.js object graph
 * Call in R3F component useEffect cleanup
 */
export function disposeObject(obj) {
  if (!obj) return

  // Dispose children first
  if (obj.children) {
    for (let i = obj.children.length - 1; i >= 0; i--) {
      disposeObject(obj.children[i])
    }
  }

  // Dispose geometry
  if (obj.geometry) {
    obj.geometry.dispose()
  }

  // Dispose material(s)
  if (obj.material) {
    if (Array.isArray(obj.material)) {
      obj.material.forEach(disposeMaterial)
    } else {
      disposeMaterial(obj.material)
    }
  }

  // Remove from parent
  if (obj.parent) {
    obj.parent.remove(obj)
  }
}

function disposeMaterial(material) {
  if (!material) return

  // Dispose textures
  const textureKeys = [
    'map', 'lightMap', 'bumpMap', 'normalMap', 'specularMap',
    'envMap', 'alphaMap', 'aoMap', 'displacementMap',
    'emissiveMap', 'gradientMap', 'metalnessMap', 'roughnessMap',
  ]

  textureKeys.forEach(key => {
    if (material[key]) {
      material[key].dispose()
    }
  })

  material.dispose()
}
