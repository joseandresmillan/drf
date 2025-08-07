import React from 'react';

// Importar imágenes directamente para que webpack las procese
import bananacv from '../../assets/images/bananacv.jpg';
import biopay from '../../assets/images/biopay.png';
import nodeMesh from '../../assets/images/node_mesh.png';
import nodeBlue from '../../assets/images/node-blue.gif';
import somnolenciacv from '../../assets/images/somnolenciacv.png';

const ImageTest = () => {
  return (
    <div style={{ 
      padding: '2rem', 
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        color: '#333'
      }}>
        🧪 Prueba de Carga de Imágenes
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        
        {/* Imagen 1: BananaCV */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>BananaCV</h3>
          <img 
            src={bananacv} 
            alt="BananaCV Project" 
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}
            onError={(e) => {
              console.error('Error cargando BananaCV:', e);
              e.target.style.border = '2px solid red';
              e.target.alt = 'Error al cargar imagen';
            }}
            onLoad={() => console.log('✅ BananaCV cargada correctamente')}
          />
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Detección de plagas en cultivos de banano usando visión por computadora
          </p>
        </div>

        {/* Imagen 2: Biopay */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>BioPay</h3>
          <img 
            src={biopay} 
            alt="BioPay Project" 
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}
            onError={(e) => {
              console.error('Error cargando BioPay:', e);
              e.target.style.border = '2px solid red';
              e.target.alt = 'Error al cargar imagen';
            }}
            onLoad={() => console.log('✅ BioPay cargada correctamente')}
          />
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Sistema de pagos biométricos usando reconocimiento facial
          </p>
        </div>

        {/* Imagen 3: Node Mesh (la problemática) */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>Node Mesh (Background)</h3>
          <img 
            src={nodeMesh} 
            alt="Node Mesh Background" 
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}
            onError={(e) => {
              console.error('Error cargando Node Mesh:', e);
              e.target.style.border = '2px solid red';
              e.target.alt = 'Error al cargar imagen';
            }}
            onLoad={() => console.log('✅ Node Mesh cargada correctamente')}
          />
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Imagen de fondo para la cabecera principal
          </p>
        </div>

        {/* Imagen 4: Node Blue */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>Node Blue (Animated)</h3>
          <img 
            src={nodeBlue} 
            alt="Node Blue Animation" 
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}
            onError={(e) => {
              console.error('Error cargando Node Blue:', e);
              e.target.style.border = '2px solid red';
              e.target.alt = 'Error al cargar imagen';
            }}
            onLoad={() => console.log('✅ Node Blue cargada correctamente')}
          />
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Animación de partículas azules para efectos visuales
          </p>
        </div>

        {/* Imagen 5: Somnolencia */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>SomnolenciaCV</h3>
          <img 
            src={somnolenciacv} 
            alt="SomnolenciaCV Project" 
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}
            onError={(e) => {
              console.error('Error cargando SomnolenciaCV:', e);
              e.target.style.border = '2px solid red';
              e.target.alt = 'Error al cargar imagen';
            }}
            onLoad={() => console.log('✅ SomnolenciaCV cargada correctamente')}
          />
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Detección de somnolencia en conductores usando IA
          </p>
        </div>

        {/* Prueba de background con CSS */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>Prueba Background CSS</h3>
          <div 
            style={{
              width: '100%',
              height: '200px',
              backgroundImage: `url(${nodeMesh})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              marginBottom: '1rem',
              border: '2px solid #e0e0e0'
            }}
          />
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Prueba de imagen como background-image usando import
          </p>
        </div>
      </div>

      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        backgroundColor: '#667eea',
        color: 'white',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h2>📊 Estado de las Pruebas</h2>
        <p>Revisa la consola del navegador para ver qué imágenes cargan correctamente.</p>
        <p>Las imágenes con borde rojo indican errores de carga.</p>
        <p>
          <strong>Método usado:</strong> Import directo desde src/assets/images/ 
          (webpack procesará automáticamente las rutas)
        </p>
      </div>
    </div>
  );
};

export default ImageTest;
