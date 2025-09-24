import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
// Default ascii image (added to repo under src/assets/images)
import asciiImage from '../assets/images/ascii-text-art.png';

const WebGLScreen = ({ className = '', style = {}, imageSrc = null }) => {
  const mountRef = useRef(null);
  const frameId = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const width = currentMount.clientWidth || 400;
    const height = currentMount.clientHeight || 300;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      preserveDrawingBuffer: true
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Fully transparent background
    currentMount.appendChild(renderer.domElement);
    
    // Create screen geometry - adjusted proportions
    const screenGeometry = new THREE.PlaneGeometry(7, 5.25); // 4:3 aspect ratio
    
  // Create canvas texture for text - better resolution (fallback)
  const canvas = document.createElement('canvas');
  canvas.width = 640;  // Higher resolution
  canvas.height = 480; // 4:3 aspect ratio
  const context = canvas.getContext('2d');
    
    // Function to draw the screen content
    const drawScreenContent = (time) => {
      // Clear with dark background
      context.fillStyle = '#001100';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle grid pattern
      context.strokeStyle = 'rgba(0, 255, 65, 0.1)';
      context.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 20) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.height);
        context.stroke();
      }
      for (let i = 0; i < canvas.height; i += 20) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(canvas.width, i);
        context.stroke();
      }
      
      // ASCII "SUCCESS" text - more compact and centered
      const asciiText = [
        "::::::::  :::    :::  ::::::::  :::::::::: ::::::::   :::::::::",
        ":+:    :+: :+:    :+: :+:    :+: :+:       :+:    :+: :+:    :+:",
        " +:+        +:+    +:+ +:+        +:+       +:+        +:+        ",
        "+#++:++#++ +#+    +:+ +#+        +#++:++#  +#++:++#++ +#++:++#++  ",
        "      +#+ +#+    +#+ +#+        +#+              +#+        +#+   ",
        "#+#    #+# #+#    #+# #+#    #+# #+#       #+#    #+# #+#    #+#  ",
        "########   ########   ########  ########## ########   ########   "
      ];
      
      // Draw the ASCII art with glowing effect
      context.font = '13px "Courier New", monospace';
      context.fillStyle = '#00ff41';
      context.shadowColor = '#00ff41';
      context.shadowBlur = 10 + Math.sin(time * 2) * 3; // Enhanced pulsing glow
      
      // Calculate total text block height for perfect centering
      const lineHeight = 16;
      const totalTextHeight = asciiText.length * lineHeight;
      const startY = (canvas.height - totalTextHeight) / 2 + 20; // Slightly above center
      
      asciiText.forEach((line, index) => {
        const textWidth = context.measureText(line).width;
        const x = (canvas.width - textWidth) / 2;
        context.fillText(line, x, startY + index * lineHeight);
      });
      
      // Add status lines at bottom
      context.font = '11px "Courier New", monospace';
      context.shadowBlur = 6;
      context.fillStyle = '#00ff41';
      
      const statusLine1 = 'Processing complete: All technologies integrated successfully';
      const statusLine2 = 'System status: Operational | Build: v2.5.3 | Uptime: 99.98%';
      
      // Center the status lines
      const status1Width = context.measureText(statusLine1).width;
      const status2Width = context.measureText(statusLine2).width;
      
      context.fillText(statusLine1, (canvas.width - status1Width) / 2, canvas.height - 50);
      context.fillText(statusLine2, (canvas.width - status2Width) / 2, canvas.height - 30);
      
      // Add blinking cursor
      const cursorOpacity = Math.sin(time * 3) > 0 ? 1 : 0;
      context.fillStyle = `rgba(0, 255, 65, ${cursorOpacity})`;
      context.fillRect(canvas.width - 30, canvas.height - 15, 8, 2);
      
      // Add subtle scanlines effect
      for (let i = 0; i < canvas.height; i += 4) {
        context.fillStyle = 'rgba(0, 0, 0, 0.1)';
        context.fillRect(0, i, canvas.width, 2);
      }
      
      // Add random "noise" pixels for authenticity
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const intensity = Math.random() * 0.3;
        context.fillStyle = `rgba(0, 255, 65, ${intensity})`;
        context.fillRect(x, y, 1, 1);
      }
    };
    
    // Prepare texture and material. Prefer an image texture if provided or available.
    const finalImageSrc = imageSrc || asciiImage || null;

    let useCanvasTexture = true;
    let texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    let material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.95
    });

    if (finalImageSrc) {
      // Load the image, draw to an offscreen canvas and convert near-white pixels to transparent
      const imgLoader = new THREE.ImageLoader();
      imgLoader.load(
        finalImageSrc,
        (img) => {
          try {
            // Create an offscreen canvas at the same resolution we use for canvas fallback
            const off = document.createElement('canvas');
            const ow = canvas.width;
            const oh = canvas.height;
            off.width = ow;
            off.height = oh;
            const ctx = off.getContext('2d');

            // Draw image centered & fit to canvas while preserving aspect ratio
            const ratio = Math.min(ow / img.width, oh / img.height);
            const iw = Math.round(img.width * ratio);
            const ih = Math.round(img.height * ratio);
            const ix = Math.round((ow - iw) / 2);
            const iy = Math.round((oh - ih) / 2);
            ctx.drawImage(img, ix, iy, iw, ih);

            // Pixel-process: make near-white (or near-background) pixels transparent
            const imageData = ctx.getImageData(0, 0, ow, oh);
            const data = imageData.data;
            const threshold = 240; // 0-255, adjust if needed
            const tolerance = 12; // allow slightly off-white
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              // If pixel is near-white (background), make it transparent
              if (r >= threshold && g >= threshold && b >= threshold) {
                data[i + 3] = 0;
              } else if ((r + g + b) / 3 >= threshold - tolerance && (r > 200 && g > 200 && b > 200)) {
                // also clear very light pixels
                data[i + 3] = 0;
              }
            }
            ctx.putImageData(imageData, 0, 0);

            // Create a Three canvas texture from processed offscreen canvas
            try { texture.dispose(); } catch (e) {}
            texture = new THREE.CanvasTexture(off);
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            material.map = texture;
            material.opacity = 1.0;
            material.needsUpdate = true;
            useCanvasTexture = false;
          } catch (err) {
            console.warn('WebGLScreen: processing image failed, falling back to canvas', err);
          }
        },
        undefined,
        (err) => {
          console.warn('WebGLScreen: image load failed, using canvas fallback', err);
        }
      );
    }
    
    const screen = new THREE.Mesh(screenGeometry, material);
    scene.add(screen);
    
    // Remove the dark frame that was causing the black space
    
    // Add subtle screen glow - adjusted size
    const glowGeometry = new THREE.PlaneGeometry(7.5, 5.75);
    const glowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ff41,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.z = -0.01;
    scene.add(glow);
    
    camera.position.z = 7; // Closer for better fit
    
    const clock = new THREE.Clock();
    
    // Animation loop with CRT effects
    const animate = () => {
      frameId.current = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Update screen content only if using the canvas texture
      if (useCanvasTexture) {
        drawScreenContent(time);
        if (texture && texture instanceof THREE.CanvasTexture) texture.needsUpdate = true;
      }

      // Subtle screen flicker
      material.opacity = 0.95 + Math.sin(time * 15) * 0.02;

      // Subtle screen movement (like old CRT monitors)
      screen.position.x = Math.sin(time * 0.5) * 0.002;
      screen.position.y = Math.cos(time * 0.7) * 0.001;

      // Glow intensity variation
      glowMaterial.opacity = 0.08 + Math.sin(time * 2) * 0.02;

      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      const newWidth = currentMount?.clientWidth || width;
      const newHeight = currentMount?.clientHeight || height;
      
      if (newWidth && newHeight) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      
      if (currentMount && renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js resources
      screenGeometry.dispose();
      glowGeometry.dispose();
      material.dispose();
      glowMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [imageSrc]);

  return (
    <div 
      ref={mountRef} 
      className={`webgl-screen ${className}`}
      style={{
        width: '100%',
        height: '100%',
        border: '12px solid #2a2a2a',
        borderRadius: '8px',
        backgroundColor: '#001100',
        boxShadow: `
          inset 0 0 20px rgba(0, 20, 0, 0.8),
          0 0 25px rgba(0, 255, 65, 0.3),
          0 0 50px rgba(0, 255, 65, 0.15)
        `,
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    />
  );
};

export default WebGLScreen;