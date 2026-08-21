import React, { useRef, useEffect, lazy, Suspense } from 'react';
import * as THREE from 'three';
// Importes para post-procesamiento
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';

const CameraControls = lazy(() => import('./CameraControls'));

const ThreeBackground = ({ className, showControls = true }) => {
  const mountRef = useRef(null);
  const frameId = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // No montar la escena animada si el usuario prefiere movimiento reducido
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const currentMount = mountRef.current;
    let width = currentMount.clientWidth;
    let height = currentMount.clientHeight;

    // ── Escena / cámara ────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    
    // 🎬 Ángulo perfecto ajustado con controles
    camera.position.set(-9, 2.5, -7.5);
    camera.lookAt(18, 5, 9.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x061021, 0.9);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '0';
    renderer.domElement.style.pointerEvents = 'auto';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    currentMount.appendChild(renderer.domElement);

    // ── Post-procesamiento: Composer + BokehPass ──────────────
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    
    const bokehPass = new BokehPass(scene, camera, {
      focus: 16.0,       // 🎯 Distancia del plano nítido (ajusta según la vista)
      aperture: 0.00125, // 📸 Apertura (más alto = más bokeh/desenfoque)
      maxblur: 0.008    // 🌀 Máximo desenfoque permitido
    });
    composer.addPass(bokehPass);

    // ── Geometría (≤100x100) ───────────────────────────────────
    const WIDTH = 60, HEIGHT = 60;
    const SX = 30, SZ = 30;
    const geo = new THREE.PlaneGeometry(WIDTH, HEIGHT, SX, SZ);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    const COUNT = pos.count;

    // guardamos posiciones base
    const base = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      base[i * 3 + 0] = pos.getX(i);
      base[i * 3 + 1] = pos.getY(i);
      base[i * 3 + 2] = pos.getZ(i);
    }

    // ── Wireframe + esferas ─────────────────────
    const wire = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x12b3ff, wireframe: true }));
    scene.add(wire);

    const sphereGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const sphereMat = new THREE.MeshBasicMaterial({ color: '#73ffff' });
    const spheres = new THREE.InstancedMesh(sphereGeo, sphereMat, COUNT);
    spheres.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(spheres);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < COUNT; i++) {
      dummy.position.set(base[i * 3 + 0], base[i * 3 + 1], base[i * 3 + 2]);
      dummy.updateMatrix();
      spheres.setMatrixAt(i, dummy.matrix);
    }

    // ── Ondas base + ondas por click ─────────────────
    const clock = new THREE.Clock();
    const baseWave = { amp: 1.6, kx: 0.1, kz: 0.3, speed: 0.8 };

    // Array de ripples
    const ripples = [];
    const MAX_RIPPLES = 5;

    // Raycasting para clicks
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hit = new THREE.Vector3();

    function addRipple(x, z, now) {
      ripples.push({
        x, z,
        t0: now,
        speed: 9.0,
        sigma: 2.2,
        amp: 1.1
      });
      if (ripples.length > MAX_RIPPLES) {
        ripples.shift();
      }
    }

    function pointerToXZ(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      const cx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const cy = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      ndc.set(cx, cy);
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(groundPlane, hit)) {
        return { x: hit.x, z: hit.z };
      }
      return null;
    }

    const handleClick = (e) => {
      const p = pointerToXZ(e);
      if (!p) return;
      addRipple(p.x, p.z, clock.getElapsedTime());
    };

    // Eventos de click
    renderer.domElement.addEventListener('click', handleClick);
    renderer.domElement.addEventListener('mousedown', handleClick);
    renderer.domElement.addEventListener('pointerdown', handleClick);

    // ── Animación ───────────────────────────────────────────────
    const tmp = new THREE.Vector2();
    let isVisible = true;
    let isPageVisible = document.visibilityState !== 'hidden';

    function animate() {
      frameId.current = requestAnimationFrame(animate);

      // No hacer trabajo si el hero está fuera del viewport o la pestaña está oculta
      if (!isVisible || !isPageVisible) return;

      const t = clock.getElapsedTime();

      // Limpiar ripples viejos
      for (let i = ripples.length - 1; i >= 0; i--) {
        const age = t - ripples[i].t0;
        const maxR = Math.max(WIDTH, HEIGHT) * 0.8;
        if (ripples[i].speed * age > maxR) {
          ripples.splice(i, 1);
        }
      }

      // Actualizar posiciones de vertices
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        const x0 = base[ix + 0];
        const z0 = base[ix + 2];

        // Onda base
        let y = Math.sin(x0 * baseWave.kx + (z0 * baseWave.kz - t * baseWave.speed)) * baseWave.amp;

        // Ripples de click
        for (let r = 0; r < ripples.length; r++) {
          const rp = ripples[r];
          const age = t - rp.t0;
          const c = rp.speed * age;
          const dist = tmp.set(x0 - rp.x, z0 - rp.z).length();
          const g = Math.exp(-(dist - c) * (dist - c) / (2 * rp.sigma * rp.sigma));
          y += rp.amp * g;
        }

        // Actualizar posiciones
        pos.setY(i, y);
        dummy.position.set(x0, y, z0);
        dummy.updateMatrix();
        spheres.setMatrixAt(i, dummy.matrix);
      }

      pos.needsUpdate = true;
      spheres.instanceMatrix.needsUpdate = true;

      // 🎬 Renderizar con efectos de post-procesamiento (Bokeh)
      composer.render();
    }

    animate();

    // Resize handler
    const handleResize = () => {
      width = currentMount?.clientWidth || width;
      height = currentMount?.clientHeight || height;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      
      // 🔧 Actualizar también el composer para el resize
      composer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Pausar el bucle de animación cuando el hero sale del viewport (scroll)
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(currentMount);

    // Pausar cuando la pestaña pasa a background
    const handleVisibilityChange = () => {
      isPageVisible = document.visibilityState !== 'hidden';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      intersectionObserver.disconnect();
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.domElement.removeEventListener('mousedown', handleClick);
      renderer.domElement.removeEventListener('pointerdown', handleClick);

      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      
      if (currentMount && renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      
      // 🧹 Cleanup del composer y passes
      composer.dispose();
      geo.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      renderer.dispose();
    };
  }, []);

  // 🎮 Funciones para manejar los controles de cámara
  const handleCameraPositionChange = (position) => {
    if (cameraRef.current) {
      // Asegurar que los valores sean números válidos
      const x = parseFloat(position.x) || 0;
      const y = parseFloat(position.y) || 0;
      const z = parseFloat(position.z) || 0;
      cameraRef.current.position.set(x, y, z);
    }
  };

  const handleCameraLookAtChange = (lookAt) => {
    if (cameraRef.current) {
      // Asegurar que los valores sean números válidos
      const x = parseFloat(lookAt.x) || 0;
      const y = parseFloat(lookAt.y) || 0;
      const z = parseFloat(lookAt.z) || 0;
      cameraRef.current.lookAt(x, y, z);
    }
  };

  return (
    <>
      <div
        ref={mountRef}
        className={`absolute inset-0 w-full h-full ${className || ''}`}
        style={{ 
          zIndex: 0,
          pointerEvents: 'auto',
          cursor: 'default'
        }}
      />
      {showControls && (
        <Suspense fallback={null}>
          <CameraControls
            onPositionChange={handleCameraPositionChange}
            onLookAtChange={handleCameraLookAtChange}
          />
        </Suspense>
      )}
    </>
  );
};

export default ThreeBackground;