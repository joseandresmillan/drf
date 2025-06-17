import React from 'react';
import PixelationEffect from '../animations/PixelationEffect';
import './PixelationTestPage.css';

// Importar las imágenes
import bananaImage from '../../assets/images/bananacv.jpg';
import biopayImage from '../../assets/images/biopay.png';
import nodeBlueImage from '../../assets/images/node-blue.gif';

const PixelationTestPage = () => {
  const images = [
    bananaImage,
    biopayImage,
    nodeBlueImage,
    
  ];

  return (
    <div className="pixelation-page">
      <header className="pixelation-header">
        <h1>PIXELLISATION</h1>
        <p>An experimental WebGL pixelation shader</p>
      </header>
      <div className="pixelation-gallery">
        {images.map((src, index) => (
          <div key={index} className="pixelation-container">
            <PixelationEffect imageSrc={src} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PixelationTestPage;
