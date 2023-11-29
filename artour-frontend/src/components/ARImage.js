import React from 'react';
import { TextureLoader } from 'three';
import { useLoader, useThree } from '@react-three/fiber';

const ARImage = ({ src, width = 5, height = 3 }) => {
  const texture = useLoader(TextureLoader, src);
  const { camera } = useThree();

  // Adjust camera position and orientation if necessary
  camera.position.z = 5;

  return (
    <mesh>
      <planeGeometry attach="geometry" args={[width, height]} />
      <meshStandardMaterial attach="material" map={texture} />
      {/* Basic ambient light */}
      <ambientLight intensity={0.5} />
      {/* Directional light */}
      <directionalLight position={[0, 0, 5]} intensity={1} />
    </mesh>
  );
};

export default ARImage;
