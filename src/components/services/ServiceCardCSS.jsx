import React, { useState } from 'react';
import './ServiceCard.css'; // Vamos a crear este archivo

const ServiceCardCSS = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`service-card ${isHovered ? 'service-card--hovered' : ''}`}
      style={{ '--delay': `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="service-card__background"></div>
      <div className="service-card__content">
        
        {/* Header con icono y categoría */}
        <div className="service-card__header">
          <div className="service-card__icon">{service.icon}</div>
          <span className="service-card__category">
            {service.category}
          </span>
        </div>

        {/* Título y descripción */}
        <h3 className="service-card__title">
          {service.name}
        </h3>
        <p className="service-card__description">
          {service.description}
        </p>

        {/* Features */}
        <div className="service-card__features">
          <h4 className="service-card__features-title">Tecnologías:</h4>
          <div className="service-card__features-list">
            {service.features.map((feature, idx) => (
              <span key={idx} className="service-card__feature-tag">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* CTA sin pricing */}
        <div className="service-card__footer">
          <button className="service-card__cta">
            Ver más
          </button>
        </div>

        {/* Timeline info */}
        {service.timeline && (
          <div className="service-card__timeline">
            ⏱️ {service.timeline}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCardCSS;
