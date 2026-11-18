import * as THREE from "three";

/**
 * Mutable per-frame state shared between scene systems without React re-renders.
 * - focus: world position the lens should focus on (the presenter's chest)
 * - transition: 0..1 pulse that spikes when the story moves to a new world/office
 */
export const stageState = {
  focus: new THREE.Vector3(0, -0.6, 0.25),
  transition: { current: 0 },
};
