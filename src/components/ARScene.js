import React, { useEffect, useRef, useState } from 'react';
import 'aframe';


const ARScene = ({ imagePath }) => {
  const imageWidth = 24;
  const imageHeight = 24;


  useEffect(() => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            //window.addEventListener('deviceorientation', handleOrientation, true);
          }
        })
        .catch(console.error);
    }
  }, []);

  return (
    <a-scene embedded arjs='sourceType: webcam;'>
      <a-assets>
        <img id="image" src={imagePath} />
      </a-assets>
      
      <a-image
        src="#image"
        position="0 6 -8"
        rotation="0 0 0"
        scale={`${imageWidth} ${imageHeight} 1`}
        aframe-extras-scroll
        aframe-extras-scroll-scale="1 1 1"
      ></a-image>
    </a-scene>
  );
};

export default ARScene;
