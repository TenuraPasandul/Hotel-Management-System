// src/App.js
import React from 'react';
import Image360Viewer from './Image360Viewer';
import '../css/style.css';
import room from '../assets/room1.jpeg'

const Render3D = () => {
  return (
    <div className="Render">
      <header className="Render-header">
       
        <Image360Viewer imageSrc={room} />
      </header>
    </div>
  );
};

export default Render3D;
