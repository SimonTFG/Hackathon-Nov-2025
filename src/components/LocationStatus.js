import React from 'react';
import './LocationStatus.css';

function LocationStatus({ coordinates, loading }) {
  return (
    <div className="location-status">
      {loading ? (
        <div className="location-loading">
          <span className="spinner"></span>
          <p>Detectando tu ubicación...</p>
        </div>
      ) : coordinates ? (
        <div className="location-info">
          <span className="location-icon">📍</span>
          <div>
            <p>
              <strong>Coordenadas:</strong> {coordinates.latitude.toFixed(4)}°, {coordinates.longitude.toFixed(4)}°
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default LocationStatus;
