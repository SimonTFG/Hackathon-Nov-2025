/**
 * Servicio para conectar con la API de AEMET
 * Documentación: https://opendata.aemet.es/
 */

const AEMET_BASE_URL = 'https://opendata.aemet.es/opendata/api';
const AEMET_API_KEY = process.env.REACT_APP_AEMET_API_KEY;

/**
 * Obtiene las alertas para una ubicación específica
 * @param {number} latitude - Latitud
 * @param {number} longitude - Longitud
 * @returns {Promise<Array>} Array de alertas
 */
export const getLocationAlerts = async (latitude, longitude) => {
  try {
    // Primero, obtener las alertas de AEMET
    const alertsResponse = await fetch(
      `${AEMET_BASE_URL}/avisos/resumen/?api_key=${AEMET_API_KEY}`
    );

    if (!alertsResponse.ok) {
      throw new Error('Error al conectar con AEMET');
    }

    const alertsData = await alertsResponse.json();

    // Si hay una URL de datos, obtener los datos completos
    if (alertsData.datos) {
      const dataResponse = await fetch(alertsData.datos);
      const fullAlertsData = await dataResponse.json();

      // Filtrar las alertas para la ubicación actual
      const filteredAlerts = filterAlertsByLocation(
        fullAlertsData,
        latitude,
        longitude
      );

      return filteredAlerts;
    }

    return [];
  } catch (error) {
    console.error('Error en getLocationAlerts:', error);
    throw error;
  }
};

/**
 * Filtra las alertas según la ubicación geográfica
 * @param {Object} alertsData - Datos de alertas de AEMET
 * @param {number} latitude - Latitud
 * @param {number} longitude - Longitud
 * @returns {Array} Alertas filtradas
 */
function filterAlertsByLocation(alertsData, latitude, longitude) {
  const alerts = [];

  try {
    // Iterar sobre las comunidades autónomas
    if (alertsData && typeof alertsData === 'object') {
      for (const [caCode, caData] of Object.entries(alertsData)) {
        if (caData && caData.avisos) {
          // Iterar sobre las zonas
          caData.avisos.forEach((alert) => {
            // Aquí procesamos cada alerta
            alerts.push({
              type: alert.event || 'Fenómeno meteorológico adverso',
              severity: alert.level || 'Verde',
              zone: caData.name || caCode,
              description: alert.description || '',
              startTime: alert.inicio,
              endTime: alert.fin,
              eventCode: alert.eventCode,
              rawData: alert
            });
          });
        }
      }
    }
  } catch (error) {
    console.error('Error al filtrar alertas:', error);
  }

  return alerts;
}

/**
 * Obtiene todas las alertas activas en España
 * @returns {Promise<Array>} Array de todas las alertas
 */
export const getAllAlerts = async () => {
  try {
    const response = await fetch(
      `${AEMET_BASE_URL}/avisos/resumen/?api_key=${AEMET_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Error al conectar con AEMET');
    }

    const data = await response.json();

    if (data.datos) {
      const dataResponse = await fetch(data.datos);
      const alertsData = await dataResponse.json();
      return alertsData;
    }

    return [];
  } catch (error) {
    console.error('Error en getAllAlerts:', error);
    throw error;
  }
};

/**
 * Obtiene información meteorológica para coordenadas específicas
 * @param {number} latitude - Latitud
 * @param {number} longitude - Longitud
 * @returns {Promise<Object>} Datos meteorológicos
 */
export const getWeatherInfo = async (latitude, longitude) => {
  try {
    // Obtener predicción diaria
    const response = await fetch(
      `${AEMET_BASE_URL}/predicciones/resumen/?api_key=${AEMET_API_KEY}&latitud=${latitude}&longitud=${longitude}`
    );

    if (!response.ok) {
      throw new Error('Error al obtener información meteorológica');
    }

    const data = await response.json();

    if (data.datos) {
      const dataResponse = await fetch(data.datos);
      const weatherData = await dataResponse.json();
      return weatherData;
    }

    return null;
  } catch (error) {
    console.error('Error en getWeatherInfo:', error);
    throw error;
  }
};
