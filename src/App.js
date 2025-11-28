import React, { useState, useEffect } from 'react';
import './App.css';
import AlertsList from './components/AlertsList';
import LocationStatus from './components/LocationStatus';
import { getLocationAlerts } from './services/aemetService';

function App() {
  const [alerts, setAlerts] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    // Obtener ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });

          try {
            setLoading(true);
            const alertsData = await getLocationAlerts(latitude, longitude);
            setAlerts(alertsData);
            setError(null);
          } catch (err) {
            setError(`Error al obtener alertas: ${err.message}`);
            console.error('Error:', err);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError(`Error de localización: ${error.message}`);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocalización no está disponible en tu navegador.');
      setLoading(false);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌡️ Alertas AEMET</h1>
        <p>Alertas meteorológicas en tu ubicación</p>
      </header>

      <main className="App-main">
        <LocationStatus coordinates={coordinates} loading={loading} />

        {error && <div className="error-message">{error}</div>}

        {loading && <div className="loading">Cargando alertas...</div>}

        {!loading && <AlertsList alerts={alerts} />}
      </main>

      <footer className="App-footer">
        <p>Datos proporcionados por la AEMET (Agencia Estatal de Meteorología)</p>
      </footer>
    </div>
  );
}

export default App;
