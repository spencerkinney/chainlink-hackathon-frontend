import React, { useEffect, useRef, useState } from 'react';
import 'aframe';

const ARScene = ({ imagePath }) => {
  const cameraRef = useRef();
  const imageRef = useRef();
  const imageWidth = 32;
  const imageHeight = 18;
  const cameraDistance = 5;

  const [panning, setPanning] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  const handleOrientation = (event) => {
    const { alpha, beta, gamma } = event;
    if (cameraRef.current) {
      const limitedAlpha = Math.max(Math.min(alpha, 70), -70);
      cameraRef.current.setAttribute('rotation', { x: beta, y: limitedAlpha, z: -gamma });
    }
  };

  const handleMouseDown = (e) => {
    setPanning(true);
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setPanning(false);
  };

  const handleMouseMove = (e) => {
    if (panning) {
      const deltaX = e.clientX - lastMousePosition.x;
      const deltaY = e.clientY - lastMousePosition.y;

      if (imageRef.current) {
        const currentRotation = imageRef.current.getAttribute('rotation');
        const newRotation = {
          x: currentRotation.x + deltaY / 5, // Adjust the sensitivity
          y: currentRotation.y - deltaX / 5, // Adjust the sensitivity
          z: currentRotation.z,
        };
        imageRef.current.setAttribute('rotation', newRotation);
      }

      setLastMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <a-scene embedded arjs='sourceType: webcam;'>
      <a-assets>
        <img id="image" src={imagePath} />
      </a-assets>

      <a-entity
        camera
        wasd-controls
        look-controls-enabled="true"
        position={`0 0 ${cameraDistance}`}
        rotation="0 0 0"
        scale="1 1 1"
        ref={cameraRef}
        aframe-extras-controls={{ pointerLockEnabled: false }}
      >
        <a-cursor></a-cursor>
      </a-entity>

      <a-image
        src="#image"
        position="0 0 -3"
        rotation="0 0 0"
        scale={`${imageWidth} ${imageHeight} 1`}
        aframe-extras-scroll
        aframe-extras-scroll-scale="1 1 1"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={imageRef}
      ></a-image>
    </a-scene>
  );
};

export default ARScene;
