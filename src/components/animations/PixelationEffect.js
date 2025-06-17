import React, { useEffect, useRef, useState } from 'react';
import './PixelationEffect.css';

const PixelationEffect = ({ imageSrc }) => {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');

    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute vec2 a_texcoord;
      varying vec2 v_texcoord;

      void main() {
        v_texcoord = a_texcoord;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      varying vec2 v_texcoord;
      uniform sampler2D u_texture;
      uniform float pixelation;

      void main() {
        vec2 pos = vec2(v_texcoord.xy);

        if (pixelation > 0.0) {
          float offsetY = -1.0 * mod(pos.y, pixelation);
          pos.y += offsetY;
        }

        gl_FragColor = texture2D(u_texture, pos);
      }
    `;

    const createShader = (gl, type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1, 0.0, 1.0, 1, -1, 1.0, 1.0, -1, 1, 0.0, 0.0, 1, 1, 1.0, 0.0,
      ]),
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    const texcoordLoc = gl.getAttribLocation(program, 'a_texcoord');
    const pixelationLoc = gl.getUniformLocation(program, 'pixelation');

    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 4 * 4, 0);
    gl.enableVertexAttribArray(texcoordLoc);
    gl.vertexAttribPointer(texcoordLoc, 2, gl.FLOAT, false, 4 * 4, 2 * 4);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const image = new Image();
    image.src = imageSrc;
    let updatePixelation;    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      
      // Efecto inicial de pixelación como carga
      const initialPixelation = 0.5; // Valor inicial alto para efecto dramático
      let startTime = performance.now();
      const duration = 800; // Duración de la animación en ms (0.8 segundo)

      const animateInitialEffect = (timestamp) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentPixelation = initialPixelation * (1 - progress); // Reduce la pixelación con el tiempo
        
        gl.uniform1f(pixelationLoc, currentPixelation);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        
        if (progress < 1) {
          requestAnimationFrame(animateInitialEffect);
        } else {
          // Finaliza la animación inicial
          gl.uniform1f(pixelationLoc, 0);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          setIsLoading(false);
        }
      };
      
      // Inicia la animación
      requestAnimationFrame(animateInitialEffect);

      // setup scroll-driven pixelation
      const maxPixel = 0.1; // Valor inicial más sutil
      updatePixelation = () => {
        const rect = canvas.getBoundingClientRect();
        
        // Calculamos qué tan visible está el elemento en la ventana
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const viewportHeight = window.innerHeight;

        // Si está completamente fuera de la ventana, no aplicamos pixelación
        if (elementBottom < 0 || elementTop > viewportHeight) {
          gl.uniform1f(pixelationLoc, 0);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          return;
        }

        // Si la imagen está entrando en la viewport desde abajo, comienza clara
        if (elementTop >= viewportHeight * 0.7) {
          gl.uniform1f(pixelationLoc, 0);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          return;
        }

        // Calculamos el progreso de la pixelación basado en la posición del scroll
        // A medida que la imagen sube en la pantalla, aumenta la pixelación
        let progress = 1 - (elementTop / (viewportHeight * 0.7));
        progress = Math.min(Math.max(progress, 0), 1);
        
        // Aplicamos un efecto más pronunciado (hasta 0.3)
        const pixelValue = progress * 0.3;
        gl.uniform1f(pixelationLoc, pixelValue);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };

      window.addEventListener('scroll', updatePixelation);
      updatePixelation();
    };

    return () => {
      window.removeEventListener('scroll', updatePixelation);
    };
  }, [imageSrc]);
  return (
    <div className={`pixelation-container ${isLoading ? 'loading' : ''}`}>
      <canvas ref={canvasRef} className="pixelation-canvas"></canvas>
      {isLoading && (
        <div className="pixelation-loader">
          <div className="pixel-loading-indicator"></div>
        </div>
      )}
    </div>
  );
};

export default PixelationEffect;
