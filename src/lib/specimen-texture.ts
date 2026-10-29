import * as THREE from 'three';

/** Deterministic geological grain, generated locally without network requests. */
export function geologicalTexture() {
  const size = 128;
  const pixels = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      const grain = n - Math.floor(n);
      const vein = Math.sin(x * 0.17 + Math.sin(y * 0.12) * 3);
      const value = Math.floor(125 + grain * 95 + vein * 25);
      const i = (y * size + x) * 4;
      pixels[i] = value;
      pixels[i + 1] = value;
      pixels[i + 2] = value;
      pixels[i + 3] = 255;
    }
  }
  const texture = new THREE.DataTexture(pixels, size, size);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}