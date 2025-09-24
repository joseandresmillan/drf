import React, { useEffect, useState, useRef, useMemo } from 'react';
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

export default function TechStack() {
  const { t } = useTranslation();
  const [binaryData, setBinaryData] = useState('');
  const [boxPositions, setBoxPositions] = useState([]);
  const [matrixConnections, setMatrixConnections] = useState([]);
  const [lineAnimationKey, setLineAnimationKey] = useState(0);
  const boxRefs = useRef([]);
  const containerRef = useRef(null);
  const binaryRef = useRef(null);

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

  // Reduced animation frequency for better performance
  useEffect(() => {
    const interval = setInterval(() => {
      setLineAnimationKey(prev => prev + 1);
    }, 30000); // Increased to 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Optimized position calculation with throttling
  useEffect(() => {
    let rafId;
    let isCalculating = false;
    
    const calculatePositions = () => {
      if (isCalculating || !containerRef.current || !binaryRef.current) return;
      
      isCalculating = true;
      rafId = requestAnimationFrame(() => {
        try {
          const containerRect = containerRef.current.getBoundingClientRect();
          const binaryRect = binaryRef.current.getBoundingClientRect();
          const positions = [];

          // Batch DOM queries
          const circles = boxRefs.current.map(ref => 
            ref ? ref.querySelector('div[class*="w-12 h-12"]') : null
          );

          boxRefs.current.forEach((boxRef, index) => {
            if (!boxRef) return;

            const circleElement = circles[index];
            const circleRadius = 24;
            
            let circleCenterX, circleCenterY;
            
            if (circleElement) {
              const circleRect = circleElement.getBoundingClientRect();
              circleCenterX = circleRect.left + circleRect.width / 2 - containerRect.left;
              circleCenterY = circleRect.top + circleRect.height / 2 - containerRect.top;
            } else {
              const containerElementRect = boxRef.getBoundingClientRect();
              circleCenterX = containerElementRect.left + containerElementRect.width / 2 - containerRect.left;
              circleCenterY = containerElementRect.top + circleRadius - containerRect.top;
            }
            
            // Pre-calculate target positions
            const totalHeight = binaryRect.height - 60;
            const step = totalHeight / (boxRefs.current.length + 1);
            const offset = step * (index + 1);
            
            const binaryTargetX = binaryRect.left - containerRect.left - 12;
            const binaryTargetY = binaryRect.top + 30 + offset - containerRect.top;
            
            const dx = binaryTargetX - circleCenterX;
            const dy = binaryTargetY - circleCenterY;
            const angle = Math.atan2(dy, dx);
            
            positions.push({
              start: {
                x: circleCenterX + Math.cos(angle) * (circleRadius + 3),
                y: circleCenterY + Math.sin(angle) * (circleRadius + 3)
              },
              end: {
                x: binaryTargetX,
                y: binaryTargetY
              }
            });
          });

          setBoxPositions(positions);
        } finally {
          isCalculating = false;
        }
      });
    };

    // Throttled resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(calculatePositions, 100);
    };

    const timer = setTimeout(calculatePositions, 300); // Reduced initial delay
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimeout);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [technologies]);

  const BinaryStream = React.memo(() => {
    // Simplified binary stream with CSS animations instead of individual motion elements
    const binaryLines = binaryData.split('\n');
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="font-mono text-xs leading-relaxed"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 20, 40, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 20, 40, 0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          padding: '10px'
        }}
      >
        <style jsx>{`
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

  const ConnectionLine = React.memo(({ tech, index, position, animationKey }) => {
    const colors = {
      'blue': '#3B82F6',
      'cyan': '#06B6D4', 
      'green': '#10B981',
      'yellow': '#F59E0B',
      'purple': '#8B5CF6',
      'pink': '#EC4899',
      'default': '#6B7280'
    };
    
    const getColor = (colorString) => {
      const colorKey = Object.keys(colors).find(key => colorString.includes(key));
      return colors[colorKey] || colors.default;
    };

    // Si no hay posición calculada, usar valores por defecto
    if (!position) return null;

    const { start, end } = position;
    const baseColor = getColor(tech.color);

    return (
      <motion.div
        key={`line-${index}-${animationKey}`}
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ zIndex: 1 }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id={`gradient-${index}-${animationKey}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={baseColor} stopOpacity="0.9" />
              <stop offset="50%" stopColor={baseColor} stopOpacity="0.6" />
              <stop offset="100%" stopColor={baseColor} stopOpacity="0.1" />
            </linearGradient>
            <filter id={`glow-${index}-${animationKey}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Simplified single line with CSS animation */}
          <motion.path
            d={`M ${start.x} ${start.y} Q ${start.x + (end.x - start.x) * 0.6} ${start.y + (end.y - start.y) * 0.4 + (index % 2 ? 20 : -20)} ${end.x} ${end.y}`}
            stroke={`url(#gradient-${index}-${animationKey})`}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 0.8
            }}
            transition={{ 
              pathLength: { duration: 1.5, delay: 0.2 + index * 0.08, ease: "easeOut" },
              opacity: { duration: 1, delay: 0.2 + index * 0.08 }
            }}
          />
          
          {/* Single animated dash line for flow effect */}
          <motion.path
            d={`M ${start.x} ${start.y} Q ${start.x + (end.x - start.x) * 0.6} ${start.y + (end.y - start.y) * 0.4 + (index % 2 ? 20 : -20)} ${end.x} ${end.y}`}
            stroke={baseColor}
            strokeWidth="1"
            fill="none"
            strokeDasharray="8,6"
            strokeLinecap="round"
            opacity="0.6"
            initial={{ strokeDashoffset: 0 }}
            animate={{ 
              strokeDashoffset: [-14, 0]
            }}
            transition={{ 
              duration: 3,
              delay: 1 + index * 0.1,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          
          {/* Single optimized particle */}
          <motion.circle
            r="1.5"
            fill={baseColor}
            opacity="0.8"
            initial={{ 
              cx: start.x, 
              cy: start.y,
              opacity: 0
            }}
            animate={{ 
              cx: [start.x, start.x + (end.x - start.x) * 0.6, end.x],
              cy: [start.y, start.y + (end.y - start.y) * 0.4 + (index % 2 ? 20 : -20), end.y],
              opacity: [0, 0.8, 0]
            }}
            transition={{ 
              duration: 2.5,
              delay: 1.5 + index * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          />
        </svg>
      </motion.div>
    );
  });

  // Referencia para el contenedor de resultado
  const resultRef = useRef(null);

  // Agregar líneas de conexión al resultado (matriz -> pantalla)
  useEffect(() => {
    let rafId;

    const calculateResultPositions = () => {
      if (!binaryRef.current || !resultRef.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const binaryRect = binaryRef.current.getBoundingClientRect();
      const resultRect = resultRef.current.getBoundingClientRect();

      const start = {
        x: binaryRect.right - containerRect.left,
        y: binaryRect.top + binaryRect.height / 2 - containerRect.top
      };

      const end = {
        x: resultRect.left - containerRect.left,
        y: resultRect.top + resultRect.height / 2 - containerRect.top
      };

      const offsets = [-40, 40];
      const positions = offsets.map(offset => ({
        start: { x: start.x, y: start.y + offset / 2 },
        end: { x: end.x, y: end.y + offset / 2 },
        ctrlOffset: offset
      }));

      setMatrixConnections(positions);
    };

    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => calculateResultPositions());
    };

    const timer = setTimeout(calculateResultPositions, 300);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
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
        <div ref={containerRef} className="relative min-h-[300px] md:min-h-[350px] flex flex-col md:flex-row gap-4 md:gap-0">
          {/* Columna 1 - Technology Inputs */}
          <div className="w-full md:w-1/4 md:pr-6 mb-4 md:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-3 md:gap-4 py-4 max-w-[180px] md:max-w-[200px] mx-auto"
            >
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  ref={el => boxRefs.current[index] = el}
                  initial={{ opacity: 0, x: -30, scale: 0 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: tech.delay }}
                  className="relative group flex flex-col items-center z-20"
                  data-tech-index={index}
                >
                  {/* Círculo con tecnología */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <motion.div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${tech.color} p-0.5 shadow-lg`}
                        whileHover={{ 
                          scale: 1.15,
                          boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                        }}
                        transition={{ duration: 0.2 }}
                        style={{
                          filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))"
                        }}
                      >
                        <div className="w-full h-full bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-inner">
                          <div className="scale-90">
                            {tech.icon}
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Anillo de pulso más sutil */}
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0, 0.3]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: tech.delay,
                          ease: "easeInOut"
                        }}
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${tech.color} opacity-15`}
                      />
                      

                    </div>
                    
                    {/* Nombre de la tecnología debajo */}
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
              ))}
            </motion.div>
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
                <BinaryStream />
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
          <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            {/* Líneas de entrada a procesamiento */}
            {technologies.map((tech, index) => (
              <ConnectionLine 
                key={`${tech.name}-${lineAnimationKey}`}
                tech={tech} 
                index={index} 
                position={boxPositions[index]}
                animationKey={lineAnimationKey}
              />
            ))}

            {/* Líneas que conectan la matriz con la pantalla WebGL */}
            {matrixConnections.length > 0 && (
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible', pointerEvents: 'none' }}>
                <defs>
                  <linearGradient id={`matrix-to-screen-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.75" />
                  </linearGradient>
                </defs>
                {matrixConnections.map((pos, i) => {
                  const { start, end, ctrlOffset } = pos;
                  const ctrlX = start.x + (end.x - start.x) * 0.5;
                  const ctrlY = start.y + ctrlOffset;
                  const d = `M ${start.x} ${start.y} Q ${ctrlX} ${ctrlY} ${end.x} ${end.y}`;
                  return (
                    <g key={`matrix-line-${i}`}>
                      <path d={d} stroke={`url(#matrix-to-screen-gradient)`} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.95" />
                      <path d={d} stroke="#06B6D4" strokeWidth="1" strokeDasharray="8,8" fill="none" strokeLinecap="round" opacity="0.6" />
                    </g>
                  );
                })}
              </svg>
            )}

          </div>
        </div>

        {/* Bottom CTA */}
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">{t('techStack.cta.button')}</span>
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