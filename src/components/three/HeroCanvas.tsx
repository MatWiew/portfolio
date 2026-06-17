"use client";

import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";

/**
 * Full-bleed WebGL canvas for the hero background.
 * Kept lightweight: low DPR cap, no shadows, no postprocessing —
 * priority is silky scroll performance over visual complexity.
 */
export function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ParticleField />
    </Canvas>
  );
}
