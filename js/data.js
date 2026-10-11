/**
 * Datos del viaje — edita este archivo y vuelve a desplegar.
 * Última revisión de datos: 11 de octubre de 2026.
 * Los campos con `verify: true` no se pudieron confirmar en la web oficial: la app lo avisa.
 */

const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const TRIP = {
  start: '2026-10-13',
  end: '2026-10-15',
  nights: 2,
  dates: {
    outbound: 'Martes 13 de octubre de 2026',
    return: 'Jueves 15 de octubre de 2026',
  },

  // Horas de los billetes. Si se dejan en null, la app deja apuntarlas en el propio móvil.
  // Formato 'HH:MM', por ejemplo '09:35'.
  schedules: {
    busVilafranca: '08:40',
    trainSantsMadrid: '10:40',
    trainMadridSants: '16:22',
    busSantsVilafranca: '20:45',
  },
  scheduleLabels: {
    busVilafranca: 'Hora del bus a Barcelona',
    trainSantsMadrid: 'Hora del tren a Madrid',
    trainMadridSants: 'Hora del tren a Barcelona',
    busSantsVilafranca: 'Hora del bus a Vilafranca',
  },

  hotel: {
    name: 'Hostal Madrid',
    address: 'Calle Esparteros, 6, 28012 Madrid',
    phone: '915220060',
    phoneText: '915 22 00 60',
    website: 'https://www.hostal-madrid.info/',
    checkIn: 'A partir de las 15:30',
    checkOut: 'Antes de las 11:00',
    receptionHours: 'Recepción de 8:00 a 24:00',
    notes: 'Está en pleno centro, entre la Puerta del Sol y la Plaza Mayor, en un edificio histórico. Si llegáis antes de la hora de entrada, pedid en recepción que os guarden las maletas.',
    verify: 'Horas de entrada y salida sacadas de portales de reserva. Confirmadlas con el hostal por teléfono antes de salir.',
    mapsUrl: maps('Hostal Madrid Esparteros 6 Madrid'),
  },

  locations: {
    busVilafranca: {
      name: 'Estación de autobuses de Vilafranca del Penedès',
      mapsUrl: maps('Estació d\'autobusos Vilafranca del Penedès'),
    },
    santsTrain: {
      name: 'Estación de trenes de Barcelona Sants',
      mapsUrl: 'https://maps.app.goo.gl/GuMu7NTV355V4MMG9',
    },
    santsBus: {
      name: 'Estación de autobuses de Barcelona Sants',
      mapsUrl: maps('Estació d\'autobusos Barcelona Sants'),
    },
    atocha: {
      name: 'Madrid Atocha (trenes)',
      mapsUrl: maps('Madrid Atocha estación'),
      locationUrl: 'https://maps.app.goo.gl/3G93ZM9uuVSKwPtv9',
    },
  },

  taxis: {
    madrid: [
      { name: 'Radio Teléfono Taxi (Madrid)', phone: '915478200' },
      { name: 'Tele Taxi (Madrid)', phone: '913712131' },
    ],
    barcelona: [
      { name: 'Radio Taxi (Barcelona)', phone: '933033033' },
    ],
  },

  // Pasos de cada trayecto. `time` = clave de TRIP.schedules; `map` = clave de TRIP.locations.
  routes: {
    ida: {
      title: 'Ida a Madrid',
      date: 'Martes 13 de octubre',
      summary: 'Casa → bus a Barcelona → tren AVE → Madrid → hostal',
      steps: [
        {
          title: 'Salir de casa',
          text: 'Llevad DNI, billetes y maletas. Salid sin prisas.',
          warn: 'Salid con al menos 30 minutos de margen antes del bus.',
        },
        {
          title: 'Bus de Vilafranca a Barcelona Sants',
          text: 'Id a la estación de autobuses de Vilafranca. El bus os deja en Sants, junto a la estación de trenes.',
          time: 'busVilafranca',
          map: 'busVilafranca',
          facts: [['Precio', '6,90 € por persona'], ['Cómo se paga', 'En efectivo, en el propio bus'], ['Llevad', 'Unos 14 € en efectivo para los dos']],
        },
        {
          title: 'De la estación de buses a la de trenes',
          text: 'Id andando a Sants Estació, unos 5-10 minutos. Hay señales.',
          map: 'santsTrain',
        },
        {
          title: 'Tren de Barcelona Sants a Madrid Atocha',
          text: 'Buscad en las pantallas vuestro tren con destino Madrid Atocha. El andén se anuncia poco antes de la salida.',
          time: 'trainSantsMadrid',
          facts: [['Sale', '10:40, estación de Sants'], ['Llega', '13:57, Madrid Puerta de Atocha'], ['Vuestro sitio', 'Coche 5, altura Tierra, asientos 2A y 2B']],
          tip: 'Llegad a Sants con 30 minutos de antelación. Hay control de equipaje en los trenes de alta velocidad.',
        },
        {
          title: 'Llegada a Madrid Atocha',
          text: 'Llegáis a las 13:57. Seguid las señales de salida (Salida / Taxi). Para ir al hostal lo más cómodo es el taxi: unos 10-15 minutos y 10-15 € aproximadamente.',
          location: true,
          taxi: true,
          help: [['metro', 'Ir en metro']],
        },
        {
          title: 'Llegar al hostal',
          text: 'Hostal Madrid, calle Esparteros 6. Llegaréis antes de la hora de entrada: dejad las maletas en recepción y id a comer.',
          hotel: true,
        },
      ],
    },
    vuelta: {
      title: 'Vuelta a casa',
      date: 'Jueves 15 de octubre',
      summary: 'Hostal → Atocha → tren AVE → bus a Vilafranca → casa',
      steps: [
        {
          title: 'Salir del hostal',
          text: 'Dejad la habitación antes de las 11:00; podéis dejar las maletas en recepción hasta la tarde. Revisad que no os dejáis nada: cargadores, medicinas y gafas.',
          warn: 'El tren sale a las 16:22. Salid del hostal antes de las 14:45 para llegar a Atocha con margen.',
        },
        {
          title: 'Ir a Madrid Atocha',
          text: 'En taxi o en metro (línea 1). Dejad margen: es la estación de trenes y hay control de equipaje.',
          map: 'atocha',
          taxi: true,
          help: [['metro', 'Ir en metro']],
        },
        {
          title: 'Tren de Madrid Atocha a Barcelona Sants',
          text: 'Mirad en las pantallas el andén de vuestro tren con destino Barcelona Sants.',
          time: 'trainMadridSants',
          facts: [['Sale', '16:22, Madrid Puerta de Atocha'], ['Llega', '19:24, Barcelona Sants'], ['Vuestro sitio', 'Coche 5, altura Tierra, asientos 2A y 2B']],
          tip: 'Estad en la zona de andenes 20 minutos antes de la salida.',
        },
        {
          title: 'De Sants Estació a la estación de buses',
          text: 'Al bajar del tren, seguid las señales hacia los autobuses. Son 5-10 minutos andando.',
          map: 'santsBus',
        },
        {
          title: 'Bus de Barcelona a Vilafranca',
          text: 'Coged el bus con destino Vilafranca del Penedès. Sale de Sants y os deja en Vilafranca. Hay otro a las 19:35, pero el tren llega a las 19:24 y no da tiempo: es mejor el de las 20:45 y así vais sin prisas. Podéis cenar algo en Sants mientras esperáis.',
          time: 'busSantsVilafranca',
          facts: [['Precio', '6,90 € por persona'], ['Cómo se paga', 'En efectivo, en el propio bus'], ['Llevad', 'Unos 14 € en efectivo para los dos']],
          tip: 'Si os resulta más cómodo, también podéis volver a Vilafranca en tren. No pasa nada.',
          taxiBarcelona: true,
        },
        {
          title: '¡En casa!',
          text: 'El bus os deja en la estación de autobuses de Vilafranca.',
          map: 'busVilafranca',
        },
      ],
    },
  },

  // `search` es lo que se busca en Google Maps cerca del hostal. Los tipos sin restaurantes
  // propios (abajo) muestran solo ese botón de búsqueda. Añade restaurantes a `restaurants`
  // con `cuisines: ['clave']` para que salgan en la lista.
  cuisines: [
    { key: 'tapas', label: 'Tapas y tabernas', search: 'tapas' },
    { key: 'tradicional', label: 'Cocina tradicional española', search: 'restaurante cocina tradicional española' },
    { key: 'cocido', label: 'Cocido madrileño', search: 'cocido madrileño' },
    { key: 'calamares', label: 'Bocadillo de calamares', search: 'bocadillo de calamares' },
    { key: 'arroces', label: 'Arroces y paella', search: 'restaurante paella arroces' },
    { key: 'carnes', label: 'Carnes y asados', search: 'asador carnes' },
    { key: 'marisco', label: 'Pescado y marisco', search: 'restaurante pescado marisco' },
    { key: 'menu', label: 'Menú del día', search: 'menú del día' },
    { key: 'cafe', label: 'Café y desayuno', search: 'cafetería desayuno' },
    { key: 'churros', label: 'Churros con chocolate', search: 'churros con chocolate' },
    { key: 'postres', label: 'Helados y pastelería', search: 'pastelería heladería' },
    { key: 'rapido', label: 'Rápido y barato', search: 'bocadillos baratos' },
    { key: 'pizza', label: 'Pizza e italiana', search: 'restaurante italiano pizza' },
    { key: 'hamburguesa', label: 'Hamburguesas', search: 'hamburguesería' },
    { key: 'ramen', label: 'Ramen y comida japonesa', search: 'ramen' },
    { key: 'kebab', label: 'Kebab', search: 'kebab' },
    { key: 'china', label: 'Comida china', search: 'restaurante chino' },
    { key: 'india', label: 'Comida india', search: 'restaurante indio' },
    { key: 'mexicana', label: 'Comida mexicana', search: 'restaurante mexicano' },
    { key: 'vegetariana', label: 'Vegetariana', search: 'restaurante vegetariano' },
  ],

  restaurants: [
    {
      name: 'Casa Labra',
      cuisines: ['tapas', 'rapido'],
      type: 'Taberna histórica, cerca del hostal',
      description: 'A 5 minutos andando. Famosa por el bacalao frito y las croquetas. Se come de pie en la barra: rápido y barato.',
      address: 'Calle de Tetuán, 12',
      phone: '915310081',
      hours: '11:30 a 15:30 y 18:30 a 22:30',
      mapsUrl: maps('Casa Labra Calle Tetuán 12 Madrid'),
      reserve: false,
      verify: true,
    },
    {
      name: 'La Barraca',
      cuisines: ['arroces'],
      type: 'Paella y arroces',
      description: 'Arroces en pleno centro. Opción cómoda para sentarse con calma.',
      address: 'Calle de la Reina, 29',
      phone: '915327154',
      hours: '13:30 a 16:15 y 19:30 a 23:15',
      mapsUrl: maps('La Barraca Calle de la Reina 29 Madrid'),
      reserve: true,
      verify: true,
    },
    {
      name: 'Sobrino de Botín',
      cuisines: ['carnes', 'tradicional'],
      type: 'Restaurante histórico (desde 1725)',
      description: 'Cochinillo y cordero asado al horno de leña. Es caro; ideal para una comida especial.',
      address: 'Calle de los Cuchilleros, 17',
      phone: '913664217',
      hours: '13:00 a 16:00 y 20:00 a 23:30',
      mapsUrl: maps('Sobrino de Botín Madrid'),
      reserve: true,
      verify: true,
    },
    {
      name: 'Casa Lucio',
      cuisines: ['tradicional'],
      type: 'Cocina castellana',
      description: 'Famoso por los huevos estrellados. Está en la Cava Baja.',
      address: 'Calle de la Cava Baja, 35',
      phone: '913653252',
      hours: '13:00 a 16:00 y 20:30 a 24:00',
      mapsUrl: maps('Casa Lucio Cava Baja 35 Madrid'),
      reserve: true,
      verify: true,
      warning: 'No hemos podido confirmar que siga abierto. Llamad antes de ir.',
    },
    {
      name: 'Café de Oriente',
      cuisines: ['cafe'],
      type: 'Café y restaurante con vistas',
      description: 'Frente al Palacio Real. Bueno para un café o una comida tranquila después de la visita.',
      address: 'Plaza de Oriente, 2',
      phone: '',
      hours: 'Lunes a jueves 8:30 a 1:30',
      mapsUrl: maps('Café de Oriente Plaza de Oriente 2 Madrid'),
      reserve: false,
      verify: true,
    },
    {
      name: 'Rodilla',
      cuisines: ['rapido', 'cafe'],
      type: 'Bocadillos',
      description: 'Cadena madrileña de bocadillos y sándwiches. Rápido y económico, sin reserva. Hay varios locales por el centro.',
      address: 'Varios locales en el centro',
      phone: '',
      hours: '',
      mapsUrl: maps('Rodilla Sol Madrid'),
      reserve: false,
    },
  ],

  ocio: [
    {
      name: 'El Rey León (musical)',
      type: 'Teatro, miércoles 14 a las 19:00',
      description: 'Vuestro espectáculo del miércoles. Llegad con tiempo para entrar sin prisas y encontrar los asientos.',
      address: 'Teatro Lope de Vega, Gran Vía, 57',
      phone: '',
      hours: 'Miércoles 14, función a las 19:00 (puertas a las 18:15)',
      seats: 'Anfiteatro, fila 1, asientos 1 y 2',
      mapsUrl: maps('Teatro Lope de Vega Gran Vía 57 Madrid'),
      tips: 'Para volver al hostal de noche, lo más cómodo es pedir un Bolt (7 a 15 € aprox.). Las entradas están guardadas en WhatsApp. Abridlas en el móvil antes de llegar a la puerta y enseñadlas al entrar. Las puertas abren a las 18:15, 45 minutos antes de la función. Lo mejor es estar allí sobre esa hora, antes de que empiece.',
      verify: true,
    },
    {
      name: 'Museo del Prado',
      type: 'Museo',
      description: 'Velázquez, Goya, El Greco. Calculad unas 2 horas; no hace falta verlo entero.',
      address: 'Calle de Ruiz de Alarcón, 23',
      phone: '',
      hours: 'Lunes a sábado de 10:00 a 20:00',
      price: 'Mayores de 65: 7,50 € (solo en taquilla, con DNI). Gratis de 18:00 a 20:00, pero hay cola.',
      mapsUrl: maps('Museo del Prado Madrid'),
      web: 'https://www.museodelprado.es/',
      tips: 'Llevad el DNI. Pasar la mañana aquí y comer después es un buen plan.',
      verify: true,
    },
    {
      name: 'Parque del Retiro y Palacio de Cristal',
      type: 'Parque',
      description: 'El parque más bonito de Madrid, con el estanque y el Palacio de Cristal. Paseo tranquilo con bancos por todas partes.',
      address: 'Plaza de la Independencia, 7',
      phone: '',
      hours: 'Parque de 6:00 a 22:00. Palacio de Cristal de 10:00 a 19:00',
      price: 'Gratis',
      mapsUrl: maps('Parque del Retiro Madrid'),
      tips: 'El Palacio de Cristal puede cerrar si llueve o hay viento fuerte.',
      verify: true,
    },
    {
      name: 'Palacio Real',
      type: 'Monumento',
      description: 'Residencia oficial del Rey. Se visitan las salas principales.',
      address: 'Calle de Bailén, s/n',
      phone: '',
      hours: 'Lunes a sábado de 10:00 a 18:00',
      price: 'General 18 €. Reducida 9 € (incluye mayores de 65, con DNI).',
      mapsUrl: maps('Palacio Real Madrid'),
      web: 'https://tickets.patrimonionacional.es/',
      tips: 'Puede cerrar por actos oficiales: mirad la web antes de ir. Comprar la entrada online evita colas.',
      verify: true,
    },
    {
      name: 'Templo de Debod',
      type: 'Monumento',
      description: 'Templo egipcio del siglo II a. C. con vistas muy bonitas. Es mejor al atardecer.',
      address: 'Calle de Ferraz, 1',
      phone: '913667415',
      hours: 'Martes a domingo de 10:00 a 20:00. Los lunes está cerrado',
      price: 'Gratis. Se recomienda reservar en madrid.es/debodreservas',
      mapsUrl: maps('Templo de Debod Madrid'),
      tips: 'Hay cuestas para llegar. Llevad calzado cómodo y algo de abrigo.',
    },
    {
      name: 'Plaza Mayor y Puerta del Sol',
      type: 'Paseo',
      description: 'Están a 5 minutos del hostal. Se pueden ver andando, sin prisa y sin entrada.',
      address: 'Plaza Mayor y Puerta del Sol',
      phone: '',
      hours: 'Siempre abierto',
      price: 'Gratis',
      mapsUrl: maps('Plaza Mayor Madrid'),
      tips: 'Las terrazas de la Plaza Mayor son caras. Mirad el precio antes de sentaros o tomad algo en una calle cercana.',
    },
    {
      name: 'Mercado de San Miguel',
      type: 'Mercado',
      description: 'Mercado cubierto con tapas, vinos y productos españoles. Muy bonito para ver y picar algo.',
      address: 'Plaza de San Miguel, s/n',
      phone: '',
      hours: 'Domingo a jueves de 10:00 a 24:00',
      price: 'Entrada libre. Es más caro que un bar normal.',
      mapsUrl: maps('Mercado de San Miguel Madrid'),
      verify: true,
    },
  ],

  days: [
    {
      date: '2026-10-13',
      label: 'Mar 13',
      weekday: 'Martes 13',
      title: 'Viaje y llegada',
      items: [
        { part: 'Mañana', text: 'Bus a las 8:40 en Vilafranca. Tren AVE a las 10:40 en Sants, llegada a Madrid a las 13:57.', go: { section: 'trayecto', route: 'ida' }, goLabel: 'Ver el trayecto de ida' },
        { part: 'Tarde', text: 'Dejad las maletas en el hostal (la entrada es a partir de las 15:30) y comed algo cerca.', go: { section: 'hostal' }, goLabel: 'Ver el hostal' },
        { part: 'Tarde', text: 'Paseo suave por la Puerta del Sol y la Plaza Mayor, a 5 minutos del hostal.' },
        { part: 'Noche', text: 'Cena cerca del hostal, por ejemplo en Casa Labra. Si volvéis tarde, usad Bolt (7 a 15 € aprox.).', go: { section: 'comer' }, goLabel: 'Ver dónde comer' },
      ],
    },
    {
      date: '2026-10-14',
      label: 'Mié 14',
      weekday: 'Miércoles 14',
      title: 'Día completo en Madrid',
      items: [
        { part: 'Mañana', text: 'Museo del Prado, abre a las 10:00. Calculad unas 2 horas.', go: { section: 'ver' }, goLabel: 'Ver lugares' },
        { part: 'Mediodía', text: 'Comida tranquila. Reservad con antelación si queréis un restaurante concreto.', go: { section: 'comer' }, goLabel: 'Ver dónde comer' },
        { part: 'Tarde', text: 'Paseo por el Retiro, que está al lado del Prado. Hay bancos para descansar, y luego volved al hostal a cambiaros.' },
        { part: '18:15', text: 'Las puertas abren a las 18:15. Id al Teatro Lope de Vega (Gran Vía, 57), a unos 15 minutos andando del hostal, y estad allí sobre esa hora. Llevad las entradas abiertas en WhatsApp.', go: { section: 'ver' }, goLabel: 'Ver el teatro' },
        { part: '19:00', text: 'El Rey León. Anfiteatro, fila 1, asientos 1 y 2. Para volver al hostal de noche, pedid un Bolt (7 a 15 € aprox.).', go: { section: 'hoy', help: 'apps' }, goLabel: 'Cómo usar Bolt' },
      ],
    },
    {
      date: '2026-10-15',
      label: 'Jue 15',
      weekday: 'Jueves 15',
      title: 'Vuelta a casa',
      items: [
        { part: 'Mañana', text: 'Desayuno, preparar las maletas y dejar la habitación antes de las 11:00.', go: { section: 'hostal' }, goLabel: 'Ver el hostal' },
        { part: 'Después', text: 'Tren AVE a las 16:22 en Madrid Puerta de Atocha, llegada a Sants a las 19:24.', go: { section: 'trayecto', route: 'vuelta' }, goLabel: 'Ver el trayecto de vuelta' },
        { part: 'Tarde', text: 'Bus de Sants a Vilafranca a las 20:45 y llegada a casa.' },
      ],
    },
  ],

  weather: { lat: 40.4168, lon: -3.7038 },
};

export const HELP_TOPICS = {
  taxi: {
    title: 'Cómo pedir un taxi',
    content: `
      <ul class="help-list">
        <li><strong>En la calle</strong>Buscad una parada de taxis o un coche con la luz verde encendida. Decid la dirección despacio y claro: "Calle Esparteros, 6".</li>
        <li><strong>Por teléfono</strong>En Madrid: Radio Teléfono Taxi 915 478 200. En Barcelona: Radio Taxi 933 033 033. Los botones de la app llaman por vosotros.</li>
        <li><strong>Consejo</strong>Subid solo a taxis oficiales (con licencia visible). Se paga al final, en efectivo o con tarjeta.</li>
      </ul>`,
  },
  metro: {
    title: 'De Atocha al hostal en metro',
    content: `
      <ul class="help-list">
        <li><strong>Línea 1 (azul claro)</strong>Estación Atocha Renfe, dirección Pinar de Chamartín. Bajad en <strong>Sol</strong>.</li>
        <li><strong>De Sol al hostal</strong>Salid a la Puerta del Sol y andad unos 5 minutos hasta la calle Esparteros, 6. Abrid el mapa para que os guíe.</li>
        <li><strong>Billete</strong>Se compra en las máquinas de la estación. Un viaje sencillo cuesta unos 1,50 a 2 €.</li>
        <li><strong>Con maletas</strong>Si hay muchas escaleras o vais cansados, el taxi es más cómodo.</li>
      </ul>`,
  },
  apps: {
    title: 'Moverse con Bolt',
    content: `
      <p class="help-lead">Es la forma más cómoda de moverse por Madrid, sobre todo de noche: al volver del teatro o al ir a cenar. También sirven Uber y Cabify.</p>
      <p class="help-cost"><span class="help-cost-num">7 a 15 €</span> cuesta más o menos un viaje por el centro. Tenéis Bolt instalado.</p>
      <ol class="howto">
        <li><strong>Pedid el coche</strong><span>Escribid el sitio al que vais y pulsad pedir. Veréis en el mapa cómo llega.</span></li>
        <li><strong>Mirad matrícula y modelo</strong><span>Cuando llegue, comprobad que la matrícula y el modelo son los mismos que salen en la app.</span></li>
        <li><strong>Abrid la puerta de atrás y preguntad</strong><span>Decid: "¿A nombre de quién es el viaje?". El conductor tiene que contestar <b>Juan</b>.</span></li>
        <li><strong>Subid y sentaos atrás</strong><span>Os lleva a la dirección indicada. Si el coche no puede llegar hasta la puerta, os deja lo más cerca posible.</span></li>
      </ol>
      <div class="warn"><svg class="i" aria-hidden="true"><use href="#i-alert"/></svg><span>Si la matrícula, el modelo o el nombre no coinciden, no subáis. Cancelad el viaje desde la app.</span></div>
    `,
  },
  maps: {
    title: 'Cómo usar Google Maps',
    content: `
      <ul class="help-list">
        <li><strong>Botón "Cómo ir"</strong>Abre Google Maps. Pulsad "Iniciar" y os guía paso a paso.</li>
        <li><strong>Sin internet</strong>Esta guía funciona sin conexión. Google Maps necesita datos o WiFi.</li>
        <li><strong>A pie o en metro</strong>En Maps podéis elegir cómo ir: andando, transporte público o coche.</li>
      </ul>`,
  },
  emergency: {
    title: 'Teléfonos de emergencia',
    content: `
      <ul class="help-list">
        <li><strong>Emergencias: 112</strong>Policía, ambulancia y bomberos. Es gratis y funciona en toda España.</li>
        <li><strong>Policía Nacional: 091</strong></li>
        <li><strong>Renfe, atención al cliente: 912 320 320</strong>Para problemas con el tren.</li>
        <li><strong>Hostal Madrid: 915 22 00 60</strong>Por si os perdéis o llegáis tarde.</li>
      </ul>`,
  },
  app: {
    title: 'Cómo usar esta guía',
    content: `
      <ul class="help-list">
        <li><strong>Menú de abajo</strong>Hoy, Trayecto, Hostal, Comer y Ver. Pulsad un botón para cambiar de pantalla.</li>
        <li><strong>Letra grande</strong>El botón "A A" de arriba cambia el tamaño de la letra.</li>
        <li><strong>Horas de los billetes</strong>En Trayecto, pulsad el recuadro amarillo y escoged la hora de vuestro billete. Se guarda en este móvil.</li>
        <li><strong>Sin internet</strong>Toda la información está guardada. Solo el tiempo y los mapas necesitan conexión.</li>
        <li><strong>Llamar y mapas</strong>Antes de llamar o abrir un mapa, la app os pregunta si estáis seguros.</li>
      </ul>`,
  },
};
