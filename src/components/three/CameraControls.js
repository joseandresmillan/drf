import React, { useState } from 'react';

const CameraControls = ({ onPositionChange, onLookAtChange, initialPosition, initialLookAt }) => {
  const [position, setPosition] = useState(initialPosition || { x: 5, y: 4, z: -15 });
  const [lookAt, setLookAt] = useState(initialLookAt || { x: 55, y: -10, z: 15 });
  const [isVisible, setIsVisible] = useState(false);

  const handlePositionChange = (axis, value) => {
    const newPosition = { ...position, [axis]: parseFloat(value) };
    setPosition(newPosition);
    onPositionChange?.(newPosition);
  };

  const handleLookAtChange = (axis, value) => {
    const newLookAt = { ...lookAt, [axis]: parseFloat(value) };
    setLookAt(newLookAt);
    onLookAtChange?.(newLookAt);
  };

  const copyToClipboard = () => {
    const code = `// 🎬 Configuración de cámara personalizada
camera.position.set(${position.x}, ${position.y}, ${position.z});
camera.lookAt(${lookAt.x}, ${lookAt.y}, ${lookAt.z});`;
    
    navigator.clipboard.writeText(code).then(() => {
      alert('📋 Código copiado al portapapeles!');
    });
  };

  const presetPositions = [
    {
      name: '🎬 Frontal',
      position: { x: 0, y: 4, z: 20 },
      lookAt: { x: 0, y: 0, z: 0 }
    },
    {
      name: '🦅 Aérea',
      position: { x: 0, y: 25, z: 0 },
      lookAt: { x: 0, y: 0, z: 0 }
    },
    {
      name: '🎭 Diagonal',
      position: { x: 20, y: 15, z: 20 },
      lookAt: { x: 0, y: 0, z: 0 }
    },
    {
      name: '🎪 Lateral',
      position: { x: 25, y: 5, z: 0 },
      lookAt: { x: 0, y: 0, z: 0 }
    },
    {
      name: '🎮 Inmersiva',
      position: { x: 0, y: 1, z: 10 },
      lookAt: { x: 0, y: 0, z: -20 }
    }
  ];

  const applyPreset = (preset) => {
    setPosition(preset.position);
    setLookAt(preset.lookAt);
    onPositionChange?.(preset.position);
    onLookAtChange?.(preset.lookAt);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg shadow-lg transition-colors text-sm sm:text-base"
      >
        <span className="hidden sm:inline">{isVisible ? '🎮 Ocultar Controles' : '🎮 Mostrar Controles'}</span>
        <span className="sm:hidden">{isVisible ? '🎮' : '🎛️'}</span>
      </button>

      {/* Control Panel */}
      {isVisible && (
        <div className="fixed top-4 left-4 right-4 sm:top-16 sm:right-4 sm:left-auto z-50 bg-gray-900 text-white p-3 sm:p-6 rounded-lg shadow-2xl max-h-[80vh] sm:max-h-96 overflow-y-auto w-auto sm:w-80">
          <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-center">🎬 Control de Cámara</h3>
          
          {/* Presets */}
          <div className="mb-4 sm:mb-6">
            <h4 className="text-xs sm:text-sm font-semibold mb-2 text-blue-300">📚 Presets:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-1 sm:gap-2">
              {presetPositions.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => applyPreset(preset)}
                  className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-xs transition-colors"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Position Controls */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-2 text-green-300">📍 Posición de Cámara:</h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-300 mb-1">X (Izq ← → Der): {position.x}</label>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  step="0.5"
                  value={position.x}
                  onChange={(e) => handlePositionChange('x', e.target.value)}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-300 mb-1">Y (Abajo ← → Arriba): {position.y}</label>
                <input
                  type="range"
                  min="-10"
                  max="30"
                  step="0.5"
                  value={position.y}
                  onChange={(e) => handlePositionChange('y', e.target.value)}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-300 mb-1">Z (Cerca ← → Lejos): {position.z}</label>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  step="0.5"
                  value={position.z}
                  onChange={(e) => handlePositionChange('z', e.target.value)}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* LookAt Controls */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-2 text-yellow-300">👁️ Punto de Mira:</h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-300 mb-1">X: {lookAt.x}</label>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  step="0.5"
                  value={lookAt.x}
                  onChange={(e) => handleLookAtChange('x', e.target.value)}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-300 mb-1">Y: {lookAt.y}</label>
                <input
                  type="range"
                  min="-15"
                  max="15"
                  step="0.5"
                  value={lookAt.y}
                  onChange={(e) => handleLookAtChange('y', e.target.value)}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-300 mb-1">Z: {lookAt.z}</label>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  step="0.5"
                  value={lookAt.z}
                  onChange={(e) => handleLookAtChange('z', e.target.value)}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Current Values Display */}
          <div className="mb-4 p-3 bg-gray-800 rounded text-xs">
            <div className="text-purple-300 font-semibold mb-2">📋 Valores actuales:</div>
            <div className="text-green-400">position: ({position.x}, {position.y}, {position.z})</div>
            <div className="text-yellow-400">lookAt: ({lookAt.x}, {lookAt.y}, {lookAt.z})</div>
          </div>

          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors text-sm"
          >
            📋 Copiar Código
          </button>
        </div>
      )}
    </>
  );
};

export default CameraControls;
