import React from "react";
import {
  Canvas,
  useFrame,
  Euler,
  Vector3,
  useLoader,
} from "@react-three/fiber";
import { MeshStandardMaterial, Side, MeshPhysicalMaterial } from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
import { SpringValue, animated } from "@react-spring/three";

const PlaneBox: React.FC<{
  position: Vector3;
  rotation: Euler;
  scale: number;
  side?: Side;
  animatedColorProps: { color: SpringValue<string> };
}> = ({ position, rotation, scale, side, animatedColorProps }) => {
  const texture = useLoader(EXRLoader, "/noon_grass_4k.exr"); // Specify the path to your HDR image

  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <planeGeometry args={[scale, scale]} />
      <animated.meshPhysicalMaterial
        metalness={0.7}
        roughness={0.1}
        envMapIntensity={10}
        clearcoat={1}
        side={side}
        envMap={texture}
        color="white"
      />
    </mesh>
  );
};

const ContainerBox: React.FC<{
  scale: number;
  animatedColorProps: { color: SpringValue<string> };
}> = ({ scale, animatedColorProps }) => {
  return (
    <>
      {/* Top */}
      <PlaneBox
        position={[0, scale / 2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={scale}
        side={1}
        animatedColorProps={animatedColorProps}
      />
      {/* Bottom */}
      <PlaneBox
        position={[0, -scale / 2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={scale}
        side={1}
        animatedColorProps={animatedColorProps}
      />
      {/* Left */}
      <PlaneBox
        position={[-scale / 2, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={scale}
        animatedColorProps={animatedColorProps}
      />
      {/* Right */}
      <PlaneBox
        position={[scale / 2, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={scale}
        animatedColorProps={animatedColorProps}
      />
      {/* Front */}
      <PlaneBox
        position={[0, 0, scale / 2]}
        rotation={[0, 0, 0]}
        scale={scale}
        side={1}
        animatedColorProps={animatedColorProps}
      />
      {/* Back */}
      <PlaneBox
        position={[0, 0, -scale / 2]}
        rotation={[0, Math.PI, 0]}
        scale={scale}
        side={1}
        animatedColorProps={animatedColorProps}
      />
    </>
  );
};

export default ContainerBox;
