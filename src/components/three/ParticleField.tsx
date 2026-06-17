"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 1800;
const FIELD_RADIUS = 9;
const MOUSE_INFLUENCE_RADIUS = 2.4;
const MOUSE_PUSH_STRENGTH = 1.6;

/**
 * A slowly rotating 3D point cloud that gently parts around the cursor,
 * like digital smoke or scattered fragments of code.
 */
export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  // Base positions (sphere-ish distribution) — never mutated directly.
  // Generated once via a lazy initializer, since a one-time random setup
  // is the accepted pattern for non-deterministic initial state.
  const [basePositions] = useState<Float32Array>(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribute in a flattened ellipsoid so it reads as a "field" rather than a ball.
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = FIELD_RADIUS * (0.4 + Math.random() * 0.6);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.6; // flatten vertically
      const z = r * Math.cos(phi) * 0.6 - 2; // push back in depth

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  });

  // Working buffer we actually write to each frame.
  const livePositions = useMemo(() => basePositions.slice(), [basePositions]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(livePositions, 3));
    return geo;
  }, [livePositions]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("#7f77dd"),
        size: 0.035,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
    []
  );

  const mouse3D = useRef(new THREE.Vector3(9999, 9999, 0));
  const tunnelBoost = useRef(0); // 0..1, decays over time

  useEffect(() => {
    const handler = () => {
      tunnelBoost.current = 1;
    };
    window.addEventListener("hero:boot-complete", handler);
    return () => window.removeEventListener("hero:boot-complete", handler);
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Decay the tunnel boost back to 0.
    if (tunnelBoost.current > 0) {
      tunnelBoost.current = Math.max(0, tunnelBoost.current - delta * 0.8);
    }
    const boost = tunnelBoost.current;

    // Slow ambient rotation, sped up briefly during the tunnel effect.
    pointsRef.current.rotation.y += delta * (0.04 + boost * 0.5);
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;

    // Project pointer into the same world space as the field (z ~ -2).
    const pointer = state.pointer; // [-1, 1] normalized
    mouse3D.current.set(
      pointer.x * (viewport.width / 2),
      pointer.y * (viewport.height / 2),
      -2
    );

    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const bx = basePositions[ix];
      const by = basePositions[ix + 1];
      const bz = basePositions[ix + 2];

      // Account for the field's current rotation when comparing to mouse position
      // (approximate: only rotate around Y for the comparison).
      const cosR = Math.cos(pointsRef.current.rotation.y);
      const sinR = Math.sin(pointsRef.current.rotation.y);
      const rotatedX = bx * cosR + bz * sinR;

      const dx = rotatedX - mouse3D.current.x;
      const dy = by - mouse3D.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let offsetX = 0;
      let offsetY = 0;

      if (dist < MOUSE_INFLUENCE_RADIUS) {
        const force = (1 - dist / MOUSE_INFLUENCE_RADIUS) * MOUSE_PUSH_STRENGTH;
        const angle = Math.atan2(dy, dx);
        offsetX = Math.cos(angle) * force;
        offsetY = Math.sin(angle) * force;
      }

      // Smoothly ease current position toward base + offset.
      // During the tunnel boost, pull particles toward the camera (z increases)
      // proportional to their distance from center — creates a "light tunnel" burst.
      const tunnelZ = boost * (Math.abs(bx) + Math.abs(by)) * 0.6;

      const targetX = bx + offsetX;
      const targetY = by + offsetY;
      const targetZ = bz + tunnelZ;

      arr[ix] += (targetX - arr[ix]) * 0.08;
      arr[ix + 1] += (targetY - arr[ix + 1]) * 0.08;
      arr[ix + 2] += (targetZ - arr[ix + 2]) * 0.08;
    }

    posAttr.needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
