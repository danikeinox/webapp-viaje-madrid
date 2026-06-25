/**
 * Datos del viaje — Actualizar cuando se sepan horarios y hotel
 * Edita este archivo y vuelve a desplegar la app
 */

export const TRIP = {
  dates: {
    outbound: 'Lunes 13 de octubre de 2026',
    return: 'Jueves 16 de octubre de 2026',
    nights: 3,
  },

  // Horarios pendientes de confirmar por tus padres
  schedules: {
    busVilafranca: 'PENDIENTE — preguntar hora del bus',
    trainSantsMadrid: 'PENDIENTE — preguntar hora del tren AVE',
    trainMadridSants: 'PENDIENTE — preguntar hora del tren de vuelta',
    busSantsVilafranca: 'PENDIENTE — preguntar hora del bus de vuelta',
  },

  hotel: {
    name: 'PENDIENTE — nombre del hotel',
    address: 'PENDIENTE — dirección del hotel',
    phone: '',
    checkIn: 'Desde las 14:00 (habitual)',
    checkOut: 'Antes de las 12:00 (habitual)',
    notes: 'Cuando sepáis el hotel, actualizad esta app. Podéis dejar la maleta en recepción si llegáis antes de la hora de entrada.',
    mapsQuery: 'hoteles centro Madrid',
  },

  locations: {
    busVilafranca: {
      name: 'Estación de Autobuses de Vilafranca del Penedès',
      address: 'Carrer de l\'Estació, Vilafranca del Penedès',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Estació+Autobusos+Vilafranca+del+Penedès',
    },
    santsTrain: {
      name: 'Estación de Sants (trenes)',
      address: 'Plaça dels Països Catalans, Barcelona',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Barcelona+Sants+estación+tren',
    },
    santsBus: {
      name: 'Estación de Autobuses de Sants',
      address: 'C/ Viriat, Barcelona (junto a Sants)',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Estació+Autobusos+Barcelona+Sants',
    },
    atocha: {
      name: 'Madrid Atocha (AVE)',
      address: 'Plaza del Emperador Carlos V, Madrid',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Madrid+Atocha+estación',
    },
  },

  taxis: {
    madrid: [
      { name: 'Radio Taxi Madrid', phone: '915478200' },
      { name: 'Tele Taxi Madrid', phone: '913712131' },
      { name: 'Taxi oficial (parada Atocha)', phone: '915278000' },
    ],
    barcelona: [
      { name: 'Radio Taxi Barcelona', phone: '933033033' },
      { name: 'Taxi Barcelona', phone: '932250000' },
    ],
  },

  restaurants: [
    {
      name: 'Casa Lucio',
      type: 'Cocina castellana tradicional',
      description: 'Famoso por sus huevos estrellados. Ambiente clásico madrileño, muy recomendable para una comida especial.',
      address: 'Calle de la Cava Baja, 35, Madrid',
      phone: '913653253',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Casa+Lucio+Madrid',
      reserve: true,
    },
    {
      name: 'Sobrino de Botín',
      type: 'Restaurante histórico',
      description: 'El restaurante más antiguo del mundo (desde 1725). Cochinillo y cordero al horno. Reservar con antelación.',
      address: 'Calle de Cuchilleros, 17, Madrid',
      phone: '913664217',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sobrino+de+Botín+Madrid',
      reserve: true,
    },
    {
      name: 'La Barraca',
      type: 'Paella y arroces',
      description: 'Buena paella en pleno centro. Opción cómoda y familiar.',
      address: 'Calle de la Reina, 29, Madrid',
      phone: '915327154',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=La+Barraca+Madrid+Reina',
      reserve: true,
    },
    {
      name: 'Café de Oriente',
      type: 'Restaurante con vistas',
      description: 'Junto al Palacio Real. Menú del día y cocina española. Vistas muy bonitas.',
      address: 'Plaza de Oriente, 2, Madrid',
      phone: '915142112',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Café+de+Oriente+Madrid',
      reserve: true,
    },
    {
      name: 'Rodilla',
      type: 'Bocadillos y tentempiés',
      description: 'Cadena madrileña de bocadillos. Rápido, económico y sin necesidad de reserva. Ideal para un tentempié.',
      address: 'Varias ubicaciones en el centro',
      phone: '915228474',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rodilla+Madrid+centro',
      reserve: false,
    },
    {
      name: '100 Montaditos',
      type: 'Montaditos económicos',
      description: 'Montaditos baratos y variados. Sin reserva, muy informal.',
      address: 'Varias ubicaciones en el centro',
      phone: '915238888',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=100+Montaditos+Madrid+centro',
      reserve: false,
    },
  ],

  ocio: [
    {
      name: 'Museo del Prado',
      type: 'Museo',
      description: 'Uno de los mejores museos del mundo. Velázquez, Goya, El Greco. Entrada gratuita ciertos horarios para mayores de 65.',
      address: 'Calle de Ruiz de Alarcón, 23, Madrid',
      phone: '913302800',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Museo+del+Prado+Madrid',
      tips: 'Llevar DNI. Los mayores de 65 años tienen entrada gratuita.',
    },
    {
      name: 'Parque del Retiro',
      type: 'Parque',
      description: 'El parque más bonito de Madrid. Paseo tranquilo, barca en el estanque, Palacio de Cristal.',
      address: 'Plaza de la Independencia, Madrid',
      phone: '',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Parque+del+Retiro+Madrid',
      tips: 'Ideal por la mañana. Hay bancos para descansar por todas partes.',
    },
    {
      name: 'Plaza Mayor',
      type: 'Monumento',
      description: 'La plaza más famosa de Madrid. Terrazas para tomar algo y ambiente histórico.',
      address: 'Plaza Mayor, Madrid',
      phone: '',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+Mayor+Madrid',
      tips: 'Cuidado con los precios en las terrazas de la plaza. Mejor tomar algo en calles cercanas.',
    },
    {
      name: 'Palacio Real',
      type: 'Monumento',
      description: 'Residencia oficial del Rey. Visita guiada por las salas principales. Reservar online o en taquilla.',
      address: 'Calle de Bailén, Madrid',
      phone: '914548800',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Palacio+Real+Madrid',
      tips: 'Llevar DNI. Evitar colas reservando con antelación.',
    },
    {
      name: 'Gran Vía',
      type: 'Paseo',
      description: 'La calle más famosa de Madrid. Tiendas, teatros y arquitectura impresionante.',
      address: 'Gran Vía, Madrid',
      phone: '',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gran+Vía+Madrid',
      tips: 'Buen paseo después de comer. Hay muchos bancos y cafeterías.',
    },
    {
      name: 'Templo de Debod',
      type: 'Monumento',
      description: 'Templo egipcio con vistas espectaculares al atardecer. Entrada gratuita.',
      address: 'Calle de Ferraz, Madrid',
      phone: '',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Templo+de+Debod+Madrid',
      tips: 'Mejor al atardecer. Llevar agua y calzado cómodo.',
    },
    {
      name: 'Mercado de San Miguel',
      type: 'Gastronomía',
      description: 'Mercado gourmet con tapas y productos españoles. Ambiente animado.',
      address: 'Plaza de San Miguel, Madrid',
      phone: '915429936',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mercado+de+San+Miguel+Madrid',
      tips: 'Más caro que un bar normal, pero muy bonito para ver y probar algo.',
    },
  ],

  days: [
    {
      label: 'Lun 13',
      title: 'Día de llegada',
      activities: [
        'Salir de casa con tiempo — bus a Vilafranca',
        'Bus Vilafranca → Sants',
        'Tren AVE Sants → Madrid Atocha',
        'Ir al hotel y dejar maletas',
        'Comer cerca del hotel',
        'Paseo tranquilo por el centro',
      ],
    },
    {
      label: 'Mar 14',
      title: 'Segundo día',
      activities: [
        'Desayuno en el hotel o cafetería cercana',
        'Visita al Museo del Prado o Parque del Retiro',
        'Comida en restaurante reservado',
        'Paseo por Gran Vía o Plaza Mayor',
      ],
    },
    {
      label: 'Mié 15',
      title: 'Tercer día',
      activities: [
        'Visita al Palacio Real (reservar entrada)',
        'Comida en La Cava Baja o zona centro',
        'Tarde libre — Templo de Debod al atardecer',
      ],
    },
    {
      label: 'Jue 16',
      title: 'Día de vuelta',
      activities: [
        'Desayuno y check-out del hotel',
        'Ir a Madrid Atocha con tiempo',
        'Tren AVE Madrid → Sants',
        'Bus Sants → Vilafranca',
        '¡Llegada a casa!',
      ],
    },
  ],
};

export const HELP_TOPICS = {
  taxi: {
    title: 'Cómo pedir un taxi',
    content: `
      <ul class="help-list">
        <li><strong>En Madrid</strong>Podéis llamar a Radio Taxi (915 478 200) o coger uno en una parada oficial (hoteles, Atocha, etc.). Decid la dirección claramente.</li>
        <li><strong>En Barcelona (Sants)</strong>Radio Taxi Barcelona: 933 033 033. Hay parada de taxis justo fuera de la estación.</li>
        <li><strong>Consejo</strong>Pedid siempre taxi oficial (con licencia visible). Pagad en efectivo o tarjeta según indique el taxista.</li>
      </ul>
    `,
  },
  maps: {
    title: 'Cómo usar Google Maps',
    content: `
      <ul class="help-list">
        <li><strong>Botón "Cómo ir"</strong>Abre Google Maps con la ruta. Pulsad "Iniciar" para que os guíe paso a paso.</li>
        <li><strong>Sin internet</strong>Esta app guarda la información. Para navegar en tiempo real necesitáis datos móviles o WiFi.</li>
        <li><strong>A pie o transporte</strong>En Maps podéis elegir ir andando, en metro o en taxi.</li>
      </ul>
    `,
  },
  emergency: {
    title: 'Teléfonos de emergencia',
    content: `
      <ul class="help-list">
        <li><strong>Emergencias generales</strong>112 (policía, ambulancia, bomberos)</li>
        <li><strong>Policía Nacional</strong>091</li>
        <li><strong>Guardia Civil</strong>062</li>
        <li><strong>Ambulancia</strong>061</li>
        <li><strong>Renfe (trenes)</strong>912 320 320</li>
      </ul>
    `,
  },
  app: {
    title: 'Cómo usar esta app',
    content: `
      <ul class="help-list">
        <li><strong>Menú de abajo</strong>Ida, Hotel, Comer, Ocio y Vuelta. Pulsad cada botón para ver esa parte del viaje.</li>
        <li><strong>Botones grandes</strong>"Cómo ir" abre el mapa. "Llamar" pide confirmación antes de marcar.</li>
        <li><strong>Sin internet</strong>Toda la información está guardada en el móvil. Funciona sin conexión.</li>
        <li><strong>Instalar en el móvil</strong>En Chrome: menú (⋮) → "Añadir a pantalla de inicio" o "Instalar aplicación".</li>
      </ul>
    `,
  },
};
