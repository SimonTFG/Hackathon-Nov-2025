import React from 'react';
import AlertCard from './AlertCard';
import './AlertsList.css';

function AlertsList({ alerts }) {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="no-alerts">
        <h2>✅ No hay alertas activas en tu ubicación</h2>
        <p>Tu zona está segura según los datos de la AEMET.</p>
      </div>
    );
  }

  return (
    <div className="alerts-container">
      <h2>Alertas activas ({alerts.length})</h2>
      <div className="alerts-grid">
        {alerts.map((alert, index) => (
          <AlertCard key={index} alert={alert} />
        ))}
      </div>
    </div>
  );
}

export default AlertsList;
