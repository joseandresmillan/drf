import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import roboflowLogo from '../../assets/logos/logo-roboflow.png';
import opencvLogo from '../../assets/logos/logo-opencv.png';
import WebGLScreen from '../WebGLScreen';
import { 
  SiPython, 
  SiOpenai, 
  SiDocker, 
  SiReact,  
  SiGithub,
  SiHuggingface,
} from 'react-icons/si';

// BinaryStream component moved outside to prevent re-creation
const BinaryStream = React.memo(({ binaryData }) => {
  const binaryLines = binaryData.split('\n');

  return (
    // ANIMATION: Binary stream container - very slow fade in (60s) for subtle appearance
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 60}}
      className="font-mono text-xs leading-relaxed binary-stream"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 20, 40, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 20, 40, 0.3) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        padding: '10px'
      }}
    >
      <style>{`
        .binary-char {
          display: inline-block;
          animation: binaryPulse 3s ease-in-out infinite;
        }
        .binary-char.one {
          color: #06B6D4;
          animation-duration: 2s;
        }
        .binary-char.zero {
          color: #93C5FD;
          opacity: 0.7;
          animation-duration: 3s;
        }
        @keyframes binaryPulse {
          0%, 100% { opacity: 0.5; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .binary-line:nth-child(odd) .binary-char {
          animation-delay: 0.1s;
        }
        .binary-line:nth-child(even) .binary-char {
          animation-delay: 0.3s;
        }
      `}</style>
      {binaryLines.map((line, lineIndex) => (
        <div
          key={lineIndex}
          className="binary-line whitespace-nowrap overflow-hidden h-4"
        >
          {line.split('').map((char, charIndex) => {
            if (char === ' ') return <span key={`${lineIndex}-${charIndex}-space`} className="px-0.5"></span>;

            const isOne = char === '1';
            return (
              <span
                key={`${lineIndex}-${charIndex}`}
                className={`binary-char ${isOne ? 'one' : 'zero'}`}
                style={{ animationDelay: `${(lineIndex * 0.1 + charIndex * 0.02) % 2}s` }}
              >
                {char}
              </span>
            );
          })}
        </div>
      ))}
    </motion.div>
  );
});

const ConnectionLine = React.memo(({ tech, index, circleRefs, containerRef, binaryRef }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  
  // Color palette for all lines
  const colorPalette = ['#e3f520', '#0260d4', '#ffffff', '#56617d'];
  
  // Get random color from palette
  const getRandomColor = () => {
    return colorPalette[Math.floor(Math.random() * colorPalette.length)];
  };

  // Calculate position dynamically
  const calculatePosition = useCallback(() => {
    if (!circleRefs.current[index] || !containerRef.current || !binaryRef.current) return null;

    const containerRect = containerRef.current.getBoundingClientRect();
    const circleRect = circleRefs.current[index].getBoundingClientRect();
    const binaryRect = binaryRef.current.getBoundingClientRect();
    const circleRadius = 24;

    const circleCenterX = circleRect.left + circleRect.width / 2 - containerRect.left;
    const circleCenterY = circleRect.top + circleRect.height / 2 - containerRect.top;

    // Target position on binary box
    const totalHeight = binaryRect.height - 60;
    const step = totalHeight / (circleRefs.current.length + 1);
    const offset = step * (index + 1);

    const binaryTargetX = binaryRect.left - containerRect.left - 12;
    const binaryTargetY = binaryRect.top + 30 + offset - containerRect.top;

    const dx = binaryTargetX - circleCenterX;
    const dy = binaryTargetY - circleCenterY;
    const angle = Math.atan2(dy, dx);

    return {
      start: {
        x: circleCenterX + Math.cos(angle) * (circleRadius + 3),
        y: circleCenterY + Math.sin(angle) * (circleRadius + 3)
      },
      end: {
        x: binaryTargetX,
        y: binaryTargetY
      }
    };
  }, [circleRefs, containerRef, binaryRef, index]);

  // Update position smoothly as elements move
  useEffect(() => {
    const updatePosition = () => {
      const newPosition = calculatePosition();
      if (newPosition) {
        setCurrentPosition(newPosition);
      }
    };

    // Initial position
    updatePosition();

    // Update position continuously with animation frame for smooth following
    let rafId;
    const animate = () => {
      updatePosition();
      rafId = requestAnimationFrame(animate);
    };
    
    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [calculatePosition]);

  if (!currentPosition) return null;

  const { start, end } = currentPosition;
  const baseColor = getRandomColor();

  return (
    // ANIMATION: Connection line container - quick fade in (0.5s) when line appears
    <motion.div
      key={`line-${index}`}
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ zIndex: 1 }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={baseColor} stopOpacity="0.9" />
            <stop offset="50%" stopColor={baseColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={baseColor} stopOpacity="0.1" />
          </linearGradient>
          <filter id={`glow-${index}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* ANIMATION: Main wavy connection line - draws path (15s) and very slow subtle opacity pulsing (220s) */}
        <motion.path
          d={`M ${start.x} ${start.y} C ${start.x + (end.x - start.x) * 0.3} ${start.y + (index % 2 ? 25 : -15)} ${start.x + (end.x - start.x) * 0.7} ${end.y + (index % 2 ? -20 : 30)} ${end.x} ${end.y}`}
          stroke={baseColor}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ 
            pathLength: 1, 
            opacity: [0.85, 0.95, 0.85]
          }}
          transition={{ 
            pathLength: { duration: 15, delay: 0.2 + index * 0.08, ease: "easeOut" },
            opacity: { 
              duration: 220, // Doubled from 16 for much slower flashing
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.2 + index * 0.08
            },
            d: { duration: 0.1, ease: "linear" } // Very fast transition for smooth following
          }}
        />
        
        {/* ANIMATION: Flowing dash line - extremely slow dash movement (520s) creates subtle data flow illusion */}
        <motion.path
          d={`M ${start.x} ${start.y} C ${start.x + (end.x - start.x) * 0.3} ${start.y + (index % 2 ? 25 : -15)} ${start.x + (end.x - start.x) * 0.7} ${end.y + (index % 2 ? -20 : 30)} ${end.x} ${end.y}`}
          stroke={baseColor}
          strokeWidth="1"
          fill="none"
          strokeDasharray="6,3"
          strokeLinecap="round"
          opacity="1"
          initial={{ strokeDashoffset: 0 }}
          animate={{ 
            strokeDashoffset: [-14, 0]
          }}
          transition={{ 
            duration: 1, // Multiplied by 10 from 32 for much slower stroke animation
            delay: 1 + index * 0.1,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        
        {/* ANIMATION: Traveling particle - follows wavy path (1s) with fade in/out for data transmission effect */}
        <motion.circle
          r="0.5"
          fill={baseColor}
          opacity="1"
          initial={{ 
            cx: start.x, 
            cy: start.y,
            opacity: 0
          }}
          animate={{ 
            cx: [start.x, start.x + (end.x - start.x) * 0.3, start.x + (end.x - start.x) * 0.7, end.x],
            cy: [start.y, start.y + (index % 2 ? 25 : -15), end.y + (index % 2 ? -20 : 30), end.y],
            opacity: [0, 0.5, 0.5, 0] // Reduced from 0.8 to 0.6 for less flashing
          }}
          transition={{ 
            duration: 1, // Doubled from 8 for even slower speed
            delay: 1.5 + index * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 1, 1,0]
          }}
        />
      </svg>
    </motion.div>
  );
});

export default function TechStack() {
  const { t } = useTranslation();
  const [binaryData, setBinaryData] = useState('');
  const [matrixConnections, setMatrixConnections] = useState([]);
  const circleRefs = useRef([]);
  const containerRef = useRef(null);
  const binaryRef = useRef(null);
  const resultRef = useRef(null);

  const technologies = useMemo(() => [
    {
      name: 'Python',
      icon: <SiPython className="w-6 h-6 text-blue-500" />,
      color: 'from-blue-500 to-cyan-400',
      delay: 0
    },
    {
      name: 'OpenAI',
      icon: <SiOpenai className="w-6 h-6 text-black" />,
      color: 'from-gray-800 to-gray-600',
      delay: 0.2
    },
    {
      name: 'Docker',
      icon: <SiDocker className="w-6 h-6 text-blue-600" />,
      color: 'from-blue-600 to-blue-400',
      delay: 0.4
    },
    {
      name: 'React',
      icon: <SiReact className="w-6 h-6 text-cyan-400" />,
      color: 'from-cyan-400 to-blue-400',
      delay: 0.6
    },
    {
      name: 'OpenCV',
      icon: <img src={opencvLogo} alt="OpenCV" className="w-6 h-6" />,
      color: 'from-green-500 to-blue-500',
      delay: 0.8
    },
    {
      name: 'GitHub',
      icon: <SiGithub className="w-6 h-6 text-gray-800" />,
      color: 'from-gray-700 to-gray-500',
      delay: 1.0
    },
    {
      name: 'Roboflow',
      icon: <img src={roboflowLogo} alt="Roboflow" className="w-6 h-6 object-contain" />,
      color: 'from-purple-500 to-pink-400',
      delay: 1.2
    },
    {
      name: 'Hugging Face',
      icon: <SiHuggingface className="w-6 h-6 text-yellow-500" />,
      color: 'from-yellow-500 to-orange-400',
      delay: 1.4
    }
  ], []);

  // Optimized binary generation with memoization
  const binaryDataMemo = useMemo(() => {
    const lines = 8; // Further reduced for better performance
    const charactersPerLine = 18; // Reduced for better performance
    const result = [];
    
    for (let i = 0; i < lines; i++) {
      const chars = [];
      const baseProbability = i < lines/3 ? 0.6 : i < 2*lines/3 ? 0.5 : 0.4;
      
      for (let j = 0; j < charactersPerLine; j++) {
        let probability = baseProbability;
        if (j % 3 === 0) probability += 0.1;
        if (j % 5 === 0) probability -= 0.1;
        
        // Special patterns for visual interest
        if ((i === 2 && j > 4 && j < 8) || (i === 4 && j > 8 && j < 12) || (i === 6 && j > 6 && j < 10)) {
          probability = 0.8;
        }
        
        chars.push(Math.random() < probability ? '1' : '0');
        if (j < charactersPerLine - 1) chars.push(' ');
      }
      result.push(chars.join(''));
    }
    return result.join('\n');
  }, []);

  useEffect(() => {
    setBinaryData(binaryDataMemo);
  }, [binaryDataMemo]);

  // Floating animation state
  const [floatingPositions, setFloatingPositions] = useState([]);
  const floatingRefs = useRef([]);

  const generateFloatingPositions = useCallback(() => {
    const containerWidth = 280; // Increased from 200 to give more space
    const containerHeight = 350; // Increased from 300 to give more space
    const iconSize = 48; // w-12 = 48px
    const margin = 15; // Increased margin for more breathing room
    const minDistance = iconSize + 25; // Increased from 10 to 25 for more space between elements

    const positions = [];
    const maxAttempts = 50; // Maximum attempts to place each item

    for (let i = 0; i < technologies.length; i++) {
      let attempts = 0;
      let position = null;
      let isValid = false;

      while (!isValid && attempts < maxAttempts) {
        const maxX = containerWidth - iconSize - margin;
        const maxY = containerHeight - iconSize - margin;

        const candidate = {
          x: Math.random() * maxX + margin,
          y: Math.random() * maxY + margin,
          rotation: Math.random() * 10 - 5, // Slight rotation
        };

        // Check collision with existing positions
        isValid = true;
        for (const existing of positions) {
          const dx = candidate.x - existing.x;
          const dy = candidate.y - existing.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < minDistance) {
            isValid = false;
            break;
          }
        }

        if (isValid) {
          position = candidate;
        }
        attempts++;
      }

      // If we couldn't find a valid position after max attempts, place it anyway
      if (!position) {
        const maxX = containerWidth - iconSize - margin;
        const maxY = containerHeight - iconSize - margin;
        position = {
          x: Math.random() * maxX + margin,
          y: Math.random() * maxY + margin,
          rotation: Math.random() * 10 - 5,
        };
      }

      positions.push(position);
    }

    return positions;
  }, [technologies]);

  // Initialize floating positions
  useEffect(() => {
    setFloatingPositions(generateFloatingPositions());
  }, [generateFloatingPositions]);

  // ANIMATION: Continuous floating movement - updates positions every 8s for very slow, natural drift
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingPositions(prev => {
        const iconSize = 48;
        const containerWidth = 280; // Increased from 200
        const containerHeight = 350; // Increased from 300
        const margin = 15; // Increased margin

        return prev.map((pos, index) => {
          // Add some variation to movement speed for more natural feel
          const speedMultiplier = 0.8 + Math.random() * 0.4; // Random speed between 0.8-1.2
          const baseMovement = 4 * speedMultiplier; // Reduced from 6 to 4 for slower movement
          
          // Smaller, more frequent movements for natural flow
          let newX = pos.x + (Math.random() - 0.5) * baseMovement;
          let newY = pos.y + (Math.random() - 0.5) * baseMovement;
          let newRotation = pos.rotation + (Math.random() - 0.5) * 0.6; // Slightly reduced rotation

          // Keep within bounds
          newX = Math.max(margin, Math.min(containerWidth - iconSize - margin, newX));
          newY = Math.max(margin, Math.min(containerHeight - iconSize - margin, newY));

          return {
            x: newX,
            y: newY,
            rotation: newRotation,
          };
        });
      });
    }, 8000); // Doubled from 4000ms for even slower speed

    return () => clearInterval(interval);
  }, []);

  // Fixed matrix-to-screen connection line (static positioning)
  useEffect(() => {
    // Use container dimensions to calculate proper coordinates
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      // Matrix column is ~25% + 40% = 65% of width
      // Screen column starts at ~68% of width
      // Cut the line in half and move it left - from 63% to 64.5%
      const matrixRightEdge = containerWidth * 0.63;
      const lineMidpoint = containerWidth * 0.657; // Midpoint between 0.63 and 0.66 (moved left)
      const centerY = containerHeight * 0.5;

      console.log('Container dimensions:', { width: containerWidth, height: containerHeight });
      console.log('Line coordinates:', { start: matrixRightEdge, end: lineMidpoint, y: centerY });

      const positions = [{
        start: { x: matrixRightEdge, y: centerY },
        end: { x: lineMidpoint, y: centerY }
      }];

      setMatrixConnections(positions);
    }
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        {/* ANIMATION: Header section - slide down entrance (0.6s) for page introduction */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('techStack.title')}
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
            {t('techStack.subtitle')}
          </h3>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {t('techStack.description')}
          </p>
        </motion.div>

        {/* Main Visualization - 3 columnas */}
        <div ref={containerRef} className="relative min-h-[350px] md:min-h-[400px] flex flex-col md:flex-row gap-4 md:gap-0">
          {/* Columna 1 - Technology Inputs - Now floating */}
          <div className="w-full md:w-1/4 md:pr-6 mb-4 md:mb-0 relative" style={{ height: '350px' }}>
            {technologies.map((tech, index) => {
              const floatingPos = floatingPositions[index];
              return (
                // ANIMATION: Technology icon entrance - fade in + scale up (0.6s) with spring physics for position/rotation
                <motion.div
                  key={tech.name}
                  ref={el => floatingRefs.current[index] = el}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: floatingPos?.x || 0,
                    y: floatingPos?.y || 0,
                    rotate: floatingPos?.rotation || 0,
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: tech.delay },
                    scale: { duration: 0.6, delay: tech.delay },
                    x: { type: "spring", stiffness: 15, damping: 20, mass: 0.8 }, // Softer, more natural spring
                    y: { type: "spring", stiffness: 15, damping: 20, mass: 0.8 },
                    rotate: { type: "spring", stiffness: 12, damping: 18, mass: 0.6 }
                  }}
                  className="absolute z-20"
                  data-tech-index={index}
                  style={{
                    left: 0,
                    top: 0,
                  }}
                >
                  {/* Círculo con tecnología */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <motion.div
                        ref={el => circleRefs.current[index] = el}
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${tech.color} p-0.5 relative`}
                        whileHover={{ 
                          scale: 1.15,
                          boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                        }}
                        transition={{ duration: 0.2 }}
                        style={{
                          filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))",
                          transform: "translateZ(0)", // Enable hardware acceleration
                          boxShadow: `
                            0 4px 8px rgba(0, 0, 0, 0.3),
                            0 8px 16px rgba(0, 0, 0, 0.2),
                            0 12px 24px rgba(0, 0, 0, 0.1),
                            inset 0 1px 0 rgba(255, 255, 255, 0.1)
                          `,
                        }}
                      >
                        <div className="w-full h-full bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-inner">
                          <div className="scale-90">
                            {tech.icon}
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* ANIMATION: Pulse ring - slow scale and opacity cycle (16s) creates subtle breathing effect */}
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0, 0.3]
                        }}
                        transition={{
                          duration: 16,
                          repeat: Infinity,
                          delay: tech.delay,
                          ease: "easeInOut"
                        }}
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${tech.color} opacity-15`}
                      />
                      

                    </div>
                    
                    {/* ANIMATION: Technology name - delayed fade in and slide up for staggered appearance */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: tech.delay + 0.3 }}
                      className="mt-1.5 text-center px-1"
                    >
                      <span className="text-white text-[10px] font-medium leading-tight">
                        {tech.name}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Columna 2 - Binary Data Stream (Processing) */}
          <div className="w-full md:w-2/5 px-2 md:px-3 flex items-center justify-center mb-4 md:mb-0">
            <motion.div
              ref={binaryRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gray-900/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 w-full max-h-[280px] overflow-hidden relative"
              style={{ zIndex: 10 }}
            >
              <div className="mb-2 flex items-center space-x-2">
                {/* ANIMATION: Processing indicator - pulsing scale and opacity (2s) shows active processing */}
                <motion.div 
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-cyan-400 text-xs font-mono">Processing Matrix</span>
              </div>
              
              <div className="overflow-hidden h-[190px] px-1 flex items-center justify-center">
                <BinaryStream binaryData={binaryData} />
              </div>
              
              {/* Efectos mejorados */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none rounded-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/5 pointer-events-none rounded-lg"></div>
              <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none rounded-t-lg opacity-70"></div>
              <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none rounded-b-lg opacity-70"></div>
              
              {/* Líneas de cuadrícula tenues */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(to right, cyan 1px, transparent 1px), linear-gradient(to bottom, cyan 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}></div>
            </motion.div>
          </div>

          {/* Columna 3 - WebGL Screen Result */}
          <div className="w-full md:w-1/3 pl-2 md:pl-4 flex items-center justify-center">
            {/* ANIMATION: WebGL screen - slide from right entrance (0.8s) for smooth reveal */}
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center"
            >
              {/* Render the WebGL preview/screenshot component */}
              <div className="w-[370px] h-[260px] sm:w-[400px] sm:h-[300px] rounded-lg overflow-hidden shadow-lg bg-black/70">
                <WebGLScreen className="w-full h-full" style={{ display: 'block' }} />
              </div>
            </motion.div>
          </div>

          {/* Connection Lines */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            {/* Líneas de entrada a procesamiento */}
            {technologies.map((tech, index) => (
              <ConnectionLine 
                key={tech.name}
                tech={tech} 
                index={index} 
                circleRefs={circleRefs}
                containerRef={containerRef}
                binaryRef={binaryRef}
              />
            ))}

            {/* Líneas que conectan la matriz con la pantalla WebGL - Single centered connection */}
            {matrixConnections.length > 0 && (
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible', pointerEvents: 'none', zIndex: 30 }}>
                <defs>
                  <linearGradient id={`matrix-to-screen-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e3f520" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#0260d4" stopOpacity="0.75" />
                  </linearGradient>
                </defs>
                {matrixConnections.map((pos, i) => {
                  const { start, end } = pos;
                  // Create straight line between centers for cleaner connection
                  const d = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
                  return (
                    <g key={`matrix-line-${i}`}>
                      {/* Simple pulsing connection line */}
                      <motion.path
                        d={d}
                        stroke="#e3f520"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ opacity: 0.3, pathLength: 0 }}
                        animate={{
                          opacity: [0.3, 1, 0.3],
                          pathLength: 1
                        }}
                        transition={{
                          opacity: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          },
                          pathLength: {
                            duration: 1,
                            ease: "easeOut"
                          }
                        }}
                      />

                      {/* Traveling particle */}
                      <motion.circle
                        r="2.5"
                        fill="#e3f520"
                        opacity="0.8"
                        initial={{
                          cx: start.x,
                          cy: start.y,
                          opacity: 0
                        }}
                        animate={{
                          cx: [start.x, end.x],
                          cy: [start.y, end.y],
                          opacity: [0, 0.8, 0.8, 0]
                        }}
                        transition={{
                          duration: 3,
                          delay: 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                          times: [0, 0.1, 0.9, 1]
                        }}
                      />
                    </g>
                  );
                })}
              </svg>
            )}

          </div>
        </div>

        {/* Bottom CTA */}
        {/* ANIMATION: CTA section - slide up entrance (0.6s) with hover/tap effects for interactivity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="text-center mt-16"
        >
          <p className="text-base text-gray-300 mb-6">
            {t('techStack.cta.question')}
          </p>
          <Link to="/contacto">
            {/* ANIMATION: CTA button - hover scale (0.3s) and background slide for engaging interaction */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">{t('techStack.cta.button')}</span>
              {/* ANIMATION: Button background slide - left-to-right fill on hover (0.3s) */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"
                initial={{ x: '100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}