# Viaje Madrid — Guía para Papás

Web app **PWA** (Progressive Web App) creada como guía personal de viaje para unas personas mayores (~60 años) con poca experiencia con móviles e informática. La app les acompaña durante un viaje de **3 días a Madrid** con instrucciones claras, botones grandes y todo el contenido disponible **sin conexión a internet** una vez instalada.

**Repositorio:** [github.com/danikeinox/webapp-viaje-madrid](https://github.com/danikeinox/webapp-viaje-madrid)

---

## Tabla de contenidos

- [Resumen del viaje](#resumen-del-viaje)
- [Qué se ha construido](#qué-se-ha-construido)
- [Diseño pensado para personas mayores](#diseño-pensado-para-personas-mayores)
- [Secciones de la app](#secciones-de-la-app)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Desarrollo local](#desarrollo-local)
- [Cómo actualizar el contenido](#cómo-actualizar-el-contenido)
- [Desplegar en Vercel](#desplegar-en-vercel)
- [Desplegar en Cloudflare Pages](#desplegar-en-cloudflare-pages)
- [Instalar en el móvil (PWA)](#instalar-en-el-móvil-pwa)
- [Generar e instalar el APK (Android)](#generar-e-instalar-el-apk-android)
- [Cómo funcionan las actualizaciones](#cómo-funcionan-las-actualizaciones)
- [Funcionamiento sin conexión](#funcionamiento-sin-conexión)
- [Historial de cambios](#historial-de-cambios)
- [Pendiente por confirmar](#pendiente-por-confirmar)
- [Solución de problemas](#solución-de-problemas)

---

## Resumen del viaje

| Dato | Valor |
|------|-------|
| **Fechas** | Lunes 13 → Jueves 16 de octubre de 2026 |
| **Noches** | 3 noches en Madrid |
| **Origen** | Vilafranca del Penedès |
| **Alojamiento** | [Hostal Madrid](https://www.hostal-madrid.info/) — Calle Esparteros, 6, 28012 Madrid |
| **Teléfono hostal** | 915 22 00 60 |

### Ruta de ida

```
Casa
  → Bus a estación de Vilafranca del Penedès
  → Bus Vilafranca → Barcelona Sants (estación de autobuses)
  → Andando 5-10 min a Sants (trenes)
  → Tren AVE Sants → Madrid Atocha
  → Hostal Madrid (Esparteros, 6)
```

### Ruta de vuelta

```
Hostal Madrid
  → Madrid Atocha
  → Tren AVE Madrid → Barcelona Sants
  → Andando a estación de autobuses de Sants
  → Bus Sants → Vilafranca del Penedès
  → Casa
```

---

## Qué se ha construido

Esta app es una **guía de viaje interactiva** que centraliza toda la información que los viajeros necesitan en un solo sitio, sin depender de buscar en internet, abrir correos o recordar papeles.

### Funcionalidades principales

- **Navegación por 5 secciones** con menú inferior fijo: Ida, Hostal, Comer, Ocio y Vuelta.
- **Itinerario paso a paso** numerado para la ida y la vuelta, con horarios (editables) y consejos prácticos.
- **Enlaces a Google Maps** con botón *"Cómo ir"* y confirmación antes de abrir (evita pulsaciones accidentales).
- **Botón *"¿Dónde estoy?"*** en la llegada a Atocha, para orientarse al bajar del tren.
- **Restaurantes de referencia** con dirección, descripción, mapa y teléfono para reservar.
- **Lugares de ocio** (museos, parques, monumentos) con plan sugerido por día.
- **Teléfonos de taxi** en Madrid y Barcelona, con confirmación antes de llamar.
- **Modales de ayuda** integrados: cómo pedir taxi, cómo usar Maps, emergencias, cómo usar la app.
- **PWA instalable** en Android e iPhone, con icono en la pantalla de inicio.
- **APK para Android** generable desde la URL desplegada (PWABuilder / Bubblewrap).
- **Modo offline completo** para textos, horarios, teléfonos y navegación entre secciones.
- **Actualizaciones automáticas** vía service worker cuando hay internet (sin reinstalar el APK).
- **Scroll oculto** para una interfaz más limpia (el contenido sigue siendo desplazable).
- **Scroll al inicio** al cambiar de pestaña en el menú inferior.

### Lo que NO hace la app

- No reserva billetes ni habitaciones.
- No sustituye a Google Maps para navegación en tiempo real (Maps necesita conexión).
- No realiza llamadas sin que el usuario confirme explícitamente.

---

## Diseño pensado para personas mayores

La interfaz sigue criterios de accesibilidad y simplicidad:

| Decisión | Detalle |
|----------|---------|
| **Tipografía grande** | Texto base 20px, títulos hasta 32px |
| **Botones grandes** | Mínimo 60–64px de alto, fáciles de pulsar |
| **Iconos + texto** | Cada pestaña del menú tiene emoji reconocible y etiqueta |
| **Colores contrastados** | Granate (#8B1A1A) sobre fondo crema (#FFF8F0) |
| **Confirmaciones** | Antes de llamar o abrir Maps: *"¿Seguro que quieres...?"* |
| **Pasos numerados** | Círculos rojos con números en ida y vuelta |
| **Avisos visuales** | Cajas amarillas (importante) y azules (consejo) |
| **Sin jerga técnica** | Lenguaje directo en castellano |
| **Sin barra de scroll visible** | Interfaz más limpia, menos distracciones |

---

## Secciones de la app

### Ida

Guía desde que salen de casa hasta que llegan al hostal:

1. Salir de casa (con margen de tiempo)
2. Bus a la estación de Vilafranca
3. Bus Vilafranca → Sants (con mapa de la estación de autobuses)
4. Tren AVE Sants → Madrid Atocha (enlace directo a Sants)
5. Llegada a Atocha (botón *"¿Dónde estoy?"*)
6. Ir al Hostal Madrid

Incluye acceso a ayuda de taxis y teléfonos de emergencia.

### Hostal

Datos del **[Hostal Madrid](https://www.hostal-madrid.info/)**:

- Dirección: Calle Esparteros, 6, 28012 Madrid
- Teléfono: 915 22 00 60
- Entrada desde las 14:00 (anticipada bajo disponibilidad)
- Salida antes de las 12:00
- Ubicación entre Puerta del Sol y Plaza Mayor
- Botones: *Cómo ir* (Google Maps) y *Llamar al hostal*
- Consejos: recepción, WiFi, lavandería, caja fuerte (opcional)
- Indicaciones para ir a Atocha el día de la vuelta

### Comer

6 restaurantes de referencia en el centro de Madrid:

| Restaurante | Tipo | Reserva recomendada |
|-------------|------|---------------------|
| Casa Lucio | Cocina castellana | Sí |
| Sobrino de Botín | Histórico (1725) | Sí |
| La Barraca | Paella y arroces | Sí |
| Café de Oriente | Con vistas al Palacio Real | Sí |
| Rodilla | Bocadillos rápidos | No |
| 100 Montaditos | Montaditos económicos | No |

Cada uno tiene mapa y teléfono con confirmación.

### Ocio

- **Pestañas por día** (Lun 13, Mar 14, Mié 15, Jue 16) con plan sugerido.
- **Lugares recomendados:** Museo del Prado, Parque del Retiro, Plaza Mayor, Palacio Real, Gran Vía, Templo de Debod, Mercado de San Miguel.
- Cada lugar con descripción, consejos, mapa y teléfono si aplica.

### Vuelta

Guía paso a paso del jueves 16:

1. Check-out del hostal
2. Del hostal a Madrid Atocha
3. Tren AVE Madrid → Sants
4. De Sants (tren) a Sants (bus)
5. Bus Sants → Vilafranca
6. Llegada a casa

Incluye teléfonos de taxi de referencia en Madrid y Barcelona.

---

## Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| **[Vite](https://vitejs.dev/)** | Bundler y servidor de desarrollo |
| **[vite-plugin-pwa](https://vite-pwa-org.netlify.app/)** | Service worker, manifest y caché offline |
| **[Workbox](https://developer.chrome.com/docs/workbox)** | Estrategia de precaché (incluido vía plugin) |
| **JavaScript vanilla** | Sin frameworks — app ligera y fácil de mantener |
| **[Sharp](https://sharp.pixelplumbing.com/)** | Generación de iconos PNG desde SVG |
| **HTML + CSS** | Interfaz estática, sin dependencias de UI |

No hay backend, base de datos ni APIs externas. Todo el contenido vive en el cliente.

---

## Estructura del proyecto

```
webapp-viaje-madrid/
├── index.html              # Página principal y estructura HTML
├── css/
│   └── styles.css          # Estilos accesibles (tipografía, botones, modales)
├── js/
│   ├── app.js              # Lógica: renderizado, navegación, modales, PWA
│   └── data.js             # ⭐ DATOS DEL VIAJE — editar aquí
├── public/
│   └── icons/              # Iconos PWA (SVG + PNG 192/512)
├── scripts/
│   └── generate-icons.mjs  # Script para generar PNG desde SVG
├── vite.config.js          # Configuración Vite + PWA
├── vercel.json             # Configuración de despliegue en Vercel
├── twa-manifest.json       # Plantilla para generar APK con Bubblewrap
├── package.json
└── README.md
```

### Archivos clave

| Archivo | Para qué sirve |
|---------|----------------|
| `js/data.js` | Horarios, hostal, restaurantes, ocio, taxis, ubicaciones. **Es el único archivo que normalmente necesitas editar.** |
| `js/app.js` | Lógica de pantallas, botones, confirmaciones y registro del service worker |
| `css/styles.css` | Apariencia visual y accesibilidad |
| `vite.config.js` | Manifest PWA, nombre de la app, colores, caché offline |

---

## Desarrollo local

### Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- npm (incluido con Node.js)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/danikeinox/webapp-viaje-madrid.git
cd webapp-viaje-madrid

# 2. Instalar dependencias
npm install

# 3. Arrancar servidor de desarrollo
npm run dev
```

Abre **http://localhost:5173** en el navegador.

### Otros comandos

```bash
npm run build    # Genera iconos + compila para producción en /dist
npm run preview  # Sirve la versión compilada en http://localhost:4173
npm run icons    # Regenera solo los iconos PNG
```

---

## Cómo actualizar el contenido

La mayoría de cambios se hacen editando **`js/data.js`**.

### Horarios de transporte

Busca el bloque `schedules` y sustituye los textos `PENDIENTE`:

```js
schedules: {
  busVilafranca: '08:30',
  trainSantsMadrid: '11:00',
  trainMadridSants: '16:00',
  busSantsVilafranca: '19:30',
},
```

### Hostal

```js
hotel: {
  name: 'Hostal Madrid',
  address: 'Calle Esparteros, 6, 28012 Madrid',
  phone: '915220060',
  website: 'https://www.hostal-madrid.info/',
  checkIn: 'Desde las 14:00 (entrada anticipada bajo disponibilidad)',
  checkOut: 'Antes de las 12:00',
  notes: '...',
  mapsQuery: 'Hostal Madrid Esparteros 6 Madrid',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hostal+Madrid+Esparteros+6+Madrid',
},
```

### Restaurantes u ocio

Añade o modifica objetos en los arrays `restaurants` y `ocio`:

```js
{
  name: 'Nombre del sitio',
  type: 'Tipo de cocina o lugar',
  description: 'Descripción breve y clara',
  address: 'Dirección completa',
  phone: '912345678',        // vacío si no hay teléfono
  mapsUrl: 'https://...',    // enlace de Google Maps
  reserve: true,               // true = mostrar aviso de reserva
  tips: 'Consejo opcional',   // solo en ocio
}
```

### Enlaces de Google Maps personalizados

Algunos enlaces ya usan URLs cortas de Google Maps (`maps.app.goo.gl`):

| Ubicación | Enlace |
|-----------|--------|
| Sants (tren AVE) | `https://maps.app.goo.gl/GuMu7NTV355V4MMG9` |
| Atocha (*¿Dónde estoy?*) | `https://maps.app.goo.gl/3G93ZM9uuVSKwPtv9` |

Para obtener un enlace nuevo: abre Google Maps → busca el sitio → Compartir → Copiar enlace.

### Publicar los cambios

```bash
git add js/data.js
git commit -m "Actualiza horarios del viaje"
git push origin master
```

Si tienes Vercel o Cloudflare conectado al repo, el despliegue es automático.

---

## Desplegar en Vercel

[Vercel](https://vercel.com) es la opción más sencilla y recomendada.

### Primera vez

1. Entra en [vercel.com](https://vercel.com) e inicia sesión con GitHub.
2. Pulsa **Add New → Project**.
3. Importa el repositorio `danikeinox/webapp-viaje-madrid`.
4. Vercel detecta **Vite** automáticamente:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Pulsa **Deploy**.

Obtendrás una URL tipo: `https://webapp-viaje-madrid.vercel.app`

### Actualizaciones posteriores

Cada `git push` a `master` despliega automáticamente una nueva versión.

---

## Desplegar en Cloudflare Pages

1. Entra en [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create**.
2. Conecta el repositorio de GitHub.
3. Configuración de build:
   - **Framework preset:** Vite (o None)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Pulsa **Save and Deploy**.

---

## Instalar en el móvil (PWA)

La PWA se instala directamente desde el navegador, sin tienda de aplicaciones.

### Android (Chrome) — recomendado

1. Abre la URL desplegada en **Google Chrome**.
2. Espera a que cargue por completo (necesita internet la primera vez).
3. Menú **⋮** (arriba a la derecha).
4. Pulsa **Instalar aplicación** o **Añadir a pantalla de inicio**.
5. Confirma. Aparecerá un icono **"Madrid Papás"** en el escritorio.

### iPhone (Safari)

1. Abre la URL en **Safari**.
2. Pulsa el botón **Compartir** (cuadrado con flecha).
3. **Añadir a pantalla de inicio**.
4. Confirma.

### Instrucciones para los viajeros

> *"Pulsad el icono rojo de Madrid en el móvil. Usad los 5 botones de abajo: Ida, Hostal, Comer, Ocio y Vuelta. Si pulsáis Llamar o el mapa, os preguntará si estáis seguros antes de hacer nada."*

---

## Generar e instalar el APK (Android)

Para padres que prefieren una "app de verdad" en lugar de un acceso directo del navegador.

### Opción A — PWABuilder (más fácil)

1. **Despliega primero** la web en Vercel o Cloudflare (necesita HTTPS).
2. Ve a [pwabuilder.com](https://www.pwabuilder.com).
3. Introduce la URL de tu app (ej. `https://webapp-viaje-madrid.vercel.app`).
4. Pulsa **Start** y espera el análisis PWA.
5. Ve a **Package for stores** → **Android**.
6. Descarga el **APK** (instalación directa) o **AAB** (para Play Store).
7. Envía el APK por WhatsApp, email o USB.
8. En el móvil Android: activa **Instalar apps desconocidas** para Chrome o el gestor de archivos si lo pide.
9. Abre el APK e instala.

### Opción B — Bubblewrap (línea de comandos)

```bash
npm install -g @bubblewrap/cli

# Sustituye la URL por tu dominio desplegado
bubblewrap init --manifest https://TU-URL.vercel.app/manifest.webmanifest

bubblewrap build
```

El APK estará en la carpeta generada. El archivo `twa-manifest.json` de este repo es una plantilla de referencia.

### Importante sobre el APK

El APK generado con PWABuilder/Bubblewrap es un **contenedor** (Trusted Web Activity) que abre tu web desplegada. **No empaqueta el contenido dentro del APK.** Por eso las actualizaciones de contenido no requieren reinstalar el APK (ver sección siguiente).

---

## Cómo funcionan las actualizaciones

### Si usaron PWA o APK (TWA) apuntando a una URL desplegada

| Tipo de cambio | ¿Reinstalar APK? | ¿Qué hacen ellos? |
|----------------|------------------|-------------------|
| Horarios, textos, restaurantes, hostal | **No** | Abrir la app con WiFi/datos una vez |
| Icono de la app en el móvil | Sí (nuevo APK) | Reinstalar |
| Cambio de URL de despliegue | Sí (nuevo APK) | Reinstalar |

### Flujo de actualización para el desarrollador

```
1. Editar js/data.js (u otros archivos)
2. git commit + git push
3. Vercel/Cloudflare despliega automáticamente
4. Los viajeros abren la app con internet
5. El service worker descarga la nueva versión en segundo plano
```

### Flujo para los viajeros

> *"Cuando te avise de cambios, abrid la app con el WiFi o los datos activados, cerradla y volved a abrirla. No hace falta reinstalar nada."*

La app usa `registerType: 'autoUpdate'` en el service worker: las actualizaciones se aplican automáticamente al detectar una nueva versión en el servidor.

---

## Funcionamiento sin conexión

### Qué funciona sin internet

- Toda la guía: textos, horarios, direcciones, teléfonos
- Navegación entre las 5 secciones
- Modales de ayuda y confirmaciones
- Plan por días y listado de restaurantes/ocio

### Qué necesita internet

- **Google Maps** (al pulsar *Cómo ir* o *¿Dónde estoy?*)
- **Llamadas telefónicas** (al pulsar *Llamar*)
- **Primera instalación** y **actualizaciones** del contenido

### Cómo se consigue el offline

1. Al visitar la app, el **service worker** (`sw.js`) guarda en caché todos los archivos estáticos (HTML, CSS, JS, iconos).
2. En visitas posteriores, la app carga desde la caché local.
3. Si hay internet, el service worker comprueba si hay una versión nueva en el servidor.

---

## Historial de cambios

### v1.0 — Creación inicial

- App PWA completa con 5 secciones de navegación
- Diseño accesible: botones y letras grandes
- Itinerario ida/vuelta paso a paso (Vilafranca → Sants → Atocha → hostal)
- Restaurantes, ocio, taxis y teléfonos de emergencia
- Confirmaciones antes de llamar o abrir Maps
- Service worker y manifest para instalación offline
- Repositorio público en GitHub
- Configuración para Vercel y generación de APK

### Ajustes de UX

- Enlaces de Maps corregidos (Sants AVE, Atocha *¿Dónde estoy?*)
- Eliminado botón duplicado de Maps en *Bus Vilafranca → Sants*
- Scroll al inicio al cambiar de pestaña
- Eliminado aviso *"Sin internet — todo funciona igual"* del header
- Eliminadas referencias a entrada gratuita +65 en el Prado

### Hostal y pulido visual

- Datos del **Hostal Madrid** (Esparteros 6, teléfono, web, consejos)
- Sección renombrada de "Hotel" a "Hostal"
- Botón *Llamar al hostal* (en lugar de *Llamar para reservar*)
- Barra de scroll oculta (sigue funcionando el desplazamiento táctil)

---

## Pendiente por confirmar

Estos campos en `js/data.js` siguen marcados como **PENDIENTE** hasta que se confirmen los billetes:

```js
schedules: {
  busVilafranca: 'PENDIENTE — preguntar hora del bus',
  trainSantsMadrid: 'PENDIENTE — preguntar hora del tren AVE',
  trainMadridSants: 'PENDIENTE — preguntar hora del tren de vuelta',
  busSantsVilafranca: 'PENDIENTE — preguntar hora del bus de vuelta',
},
```

Cuando se sepan, edita esos valores, haz push y avisa a los viajeros para que abran la app con internet.

---

## Solución de problemas

### La app no se actualiza en el móvil

1. Comprueba que el push a GitHub se desplegó en Vercel/Cloudflare.
2. Pide que abran la app **con WiFi o datos activados**.
3. Ciérrenla completamente (deslizar hacia arriba en recientes) y vuelvan a abrirla.
4. Si persiste, borren caché de Chrome: Ajustes → Apps → Madrid Papás → Almacenamiento → Borrar caché.

### El APK no abre / pantalla en blanco

- El APK necesita que la **URL de despliegue esté activa** y con HTTPS.
- Comprueba que la URL responde en un navegador normal.

### Google Maps no abre

- Necesitan **conexión a internet** en ese momento.
- Comprueba que tienen Google Maps instalado o que el navegador puede abrir enlaces.

### No pueden instalar el APK

- Android puede pedir permiso para **orígenes desconocidos**.
- Ruta habitual: Ajustes → Seguridad → Instalar apps desconocidas → permitir para Chrome o Archivos.

### La barra de scroll se ve en algunos navegadores

- Está oculta en Chrome, Safari y Firefox modernos.
- En navegadores muy antiguos puede seguir apareciendo; no afecta al funcionamiento.

### `npm run build` falla al generar iconos

```bash
npm install
npm run icons
npm run build
```

Si Sharp falla, comprueba que `public/icons/icon.svg` existe y no contiene emojis (solo formas SVG).

---

## Licencia

Proyecto de **uso personal y familiar**. Creado como regalo/guía para un viaje concreto a Madrid en octubre de 2026.

---

## Créditos

- **Hostal:** [Hostal Madrid](https://www.hostal-madrid.info/) — Esparteros, 6, Madrid
- **Repositorio:** [danikeinox/webapp-viaje-madrid](https://github.com/danikeinox/webapp-viaje-madrid)
