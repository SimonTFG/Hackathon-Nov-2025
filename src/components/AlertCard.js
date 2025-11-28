import React from 'react';
import './AlertCard.css';

function AlertCard({ alert }) {
  const getAlertIcon = (type) => {
    const typeMap = {
      'Fenómeno meteorológico adverso': '⚠️',
      'Viento': '💨',
      'Lluvia': '🌧️',
      'Nieve': '❄️',
      'Granizo': '🧊',
      'Ola de calor': '🔥',
      'Ola de frío': '🥶',
      'Nivel del mar': '🌊',
      'Temporal': '⛈️',
      'Polvo/Arena': '🌪️',
      default: '🔔'
    };

    for (const [key, icon] of Object.entries(typeMap)) {
      if (key !== 'default' && alert.type && alert.type.includes(key)) {
        return icon;
      }
    }
    return typeMap.default;
  };

  const getSeverityClass = (severity) => {
    const severityMap = {
      'Rojo': 'severity-red',
      'Naranja': 'severity-orange',
      'Amarillo': 'severity-yellow',
      'Verde': 'severity-green'
    };
    return severityMap[severity] || 'severity-default';
  };

  return (
    <div className={`alert-card ${getSeverityClass(alert.severity)}`}>
      <div className="alert-header">
        <span className="alert-icon">{getAlertIcon(alert.type)}</span>
        <span className={`alert-severity ${alert.severity?.toLowerCase()}`}>
          {alert.severity || 'Desconocida'}
        </span>
      </div>

      <h3>{alert.type || 'Alerta'}</h3>

      <div className="alert-details">
        <p>
          <strong>Zona:</strong> {alert.zone || 'No especificada'}
        </p>
        {alert.startTime && (
          <p>
            <strong>Inicio:</strong> {new Date(alert.startTime).toLocaleString('es-ES')}
          </p>
        )}
        {alert.endTime && (
          <p>
            <strong>Fin:</strong> {new Date(alert.endTime).toLocaleString('es-ES')}
          </p>
        )}
        {alert.description && (
          <p>
            <strong>Descripción:</strong> {alert.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default AlertCard;
