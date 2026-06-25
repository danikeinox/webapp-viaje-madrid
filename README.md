# Viaje Madrid — Guía para Papás

Web app PWA pensada para personas mayores (~60 años), con botones grandes, letras grandes y navegación muy sencilla. Funciona **sin conexión a internet** una vez instalada.

**Viaje:** 13 al 16 de octubre de 2026  
**Ruta:** Vilafranca del Penedès → Sants → Madrid Atocha → Hotel → (ocio) → vuelta

## Secciones

| Menú | Contenido |
|------|-----------|
| **Ida** | Paso a paso desde casa hasta el hotel |
| **Hotel** | Datos del alojamiento y cómo ir a Atocha |
| **Comer** | Restaurantes con mapa y teléfono (con confirmación) |
| **Ocio** | Plan por días y lugares de interés |
| **Vuelta** | Del hotel a casa, paso a paso |

## Actualizar horarios y hotel

Edita `js/data.js` y cambia los campos `PENDIENTE`:

```js
schedules: {
  busVilafranca: '08:30',           // hora del bus
  trainSantsMadrid: '11:00',        // tren AVE ida
  trainMadridSants: '16:00',        // tren AVE vuelta
  busSantsVilafranca: '19:30',      // bus vuelta
},
hotel: {
  name: 'Hotel Ejemplo',
  address: 'Calle Mayor 1, Madrid',
  phone: '912345678',
  mapsQuery: 'Hotel Ejemplo Madrid',
},
```

Luego vuelve a desplegar (Vercel/Cloudflare) o ejecuta `npm run build`.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Desplegar en Vercel

1. Sube el repo a GitHub (ya configurado).
2. En [vercel.com](https://vercel.com) → Import Project → selecciona el repo.
3. Framework: **Vite** (detectado automáticamente).
4. Deploy. La URL quedará tipo `https://viaje-madrid-padres.vercel.app`.

## Desplegar en Cloudflare Pages

1. En [dash.cloudflare.com](https://dash.cloudflare.com) → Pages → Create project.
2. Conecta el repo de GitHub.
3. Build command: `npm run build`
4. Build output: `dist`
5. Deploy.

## Instalar en el móvil (PWA)

### Android (Chrome)

1. Abre la web en Chrome.
2. Menú (⋮) → **Instalar aplicación** o **Añadir a pantalla de inicio**.
3. La app queda en el escritorio y funciona sin internet.

### iPhone (Safari)

1. Abre la web en Safari.
2. Compartir → **Añadir a pantalla de inicio**.

## Instalar como APK (Android)

La forma más sencilla es generar un **Trusted Web Activity (TWA)** con PWABuilder:

1. Despliega la web en Vercel o Cloudflare (necesita HTTPS).
2. Ve a [pwabuilder.com](https://www.pwabuilder.com).
3. Introduce la URL de tu app desplegada.
4. Pulsa **Package for stores** → **Android** → descarga el APK o AAB.
5. Instala el APK en los móviles de tus padres (activar "Orígenes desconocidos" si hace falta).

Alternativa con Bubblewrap (línea de comandos):

```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://TU-URL.vercel.app/manifest.webmanifest
bubblewrap build
```

El APK estará en la carpeta generada.

## Sin conexión

- Toda la información del viaje está en el código (no depende de APIs).
- El service worker guarda HTML, CSS, JS e iconos en caché.
- Google Maps y las llamadas telefónicas sí necesitan conexión cuando se usan.

## Estructura del proyecto

```
├── index.html
├── css/styles.css
├── js/
│   ├── app.js      # Lógica y pantallas
│   └── data.js     # Datos del viaje (editar aquí)
├── icons/          # Iconos PWA
├── vite.config.js
└── package.json
```

## Licencia

Uso personal — proyecto familiar.
