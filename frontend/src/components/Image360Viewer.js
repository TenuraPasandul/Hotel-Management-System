// src/components/Image360Viewer.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const ImageSphere = ({ imageSrc }) => {
  const texture = new THREE.TextureLoader().load(imageSrc);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  return (
    <mesh>
      <sphereGeometry args={[50, 60, 40]} /> {/* Increase the first argument for decreased curvature */}
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

const Image360Viewer = ({ imageSrc }) => {
  return (
    <Canvas>
      <ImageSphere imageSrc={imageSrc} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default Image360Viewer;
