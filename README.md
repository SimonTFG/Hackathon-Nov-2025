# AEMET Alertas

Una aplicación web en React que se conecta a la API pública de AEMET (Agencia Estatal de Meteorología) para mostrar alertas meteorológicas en tu ubicación actual.

## Características

- 🌍 **Detección automática de ubicación**: Usa geolocalización para detectar tu posición actual
- 🔔 **Alertas en tiempo real**: Obtiene alertas meteorológicas de AEMET
- 🎨 **Interfaz moderna**: Diseño limpio y responsivo
- 📱 **Mobile-friendly**: Funciona perfectamente en dispositivos móviles
- ⚡ **Sin servidor**: Aplicación completamente cliente-side

## Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn
- Una API key de AEMET (obtén una en https://opendata.aemet.es/)

## Instalación

1. **Clona el repositorio**
```bash
git clone <tu-repo>
cd aemet-alerts
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura la API key**
   - Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
   - Edita el archivo `.env` y añade tu API key de AEMET:
   ```
   REACT_APP_AEMET_API_KEY=tu_api_key_aqui
   ```

## Uso

### Desarrollo

```bash
npm start
```

La aplicación se abrirá en `http://localhost:3000`

### Producción

```bash
npm run build
```

Esto crea una versión optimizada en la carpeta `build/`

## Cómo obtener una API key de AEMET

1. Accede a https://opendata.aemet.es/
2. Regístrate o inicia sesión
3. Genera una nueva API key
4. Copia la key en tu archivo `.env`

## Estructura del Proyecto

```
aemet-alerts/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AlertCard.js        # Componente para mostrar una alerta
│   │   ├── AlertCard.css
│   │   ├── AlertsList.js       # Componente para la lista de alertas
│   │   ├── AlertsList.css
│   │   ├── LocationStatus.js   # Componente para mostrar ubicación
│   │   └── LocationStatus.css
│   ├── services/
│   │   └── aemetService.js     # Servicio para conectar con AEMET
│   ├── App.js                  # Componente principal
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## APIs Utilizadas

### Alertas de AEMET
```
GET https://opendata.aemet.es/opendata/api/avisos/resumen/?api_key=API_KEY
```

Devuelve las alertas meteorológicas activas en España

### Predicción Meteorológica
```
GET https://opendata.aemet.es/opendata/api/predicciones/resumen/?api_key=API_KEY&latitud=LAT&longitud=LON
```

Devuelve la predicción meteorológica para unas coordenadas específicas

## Niveles de Alerta

Las alertas se clasifican por niveles de severidad:

- 🔴 **Rojo**: Alerta máxima - peligro extremo
- 🟠 **Naranja**: Alerta importante - peligro muy alto
- 🟡 **Amarillo**: Aviso - peligro moderado
- 🟢 **Verde**: Normal - sin peligro

## Tipos de Fenómenos

- 💨 Viento
- 🌧️ Lluvia
- ❄️ Nieve
- 🧊 Granizo
- 🔥 Ola de calor
- 🥶 Ola de frío
- 🌊 Nivel del mar
- ⛈️ Temporal
- 🌪️ Polvo/Arena

## Permisos Necesarios

La aplicación solicita permiso para:
- 📍 Acceder a tu ubicación (requerido)

## Información Importante

- La aplicación solo funciona en conexiones seguras (HTTPS) o localhost
- Las alertas se cargan una sola vez cuando abres la aplicación
- Para actualizar las alertas, recarga la página

## Licencia

Este proyecto está bajo licencia MIT

## Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## Soporte

Para reportar bugs o sugerir mejoras, abre un issue en el repositorio.

## Recursos

- [API de AEMET](https://opendata.aemet.es/)
- [React Documentation](https://react.dev/)
- [MDN Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
