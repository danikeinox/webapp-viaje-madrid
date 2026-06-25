import { TRIP, HELP_TOPICS } from './data.js';

const mainContent = document.getElementById('main-content');
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalConfirm = document.getElementById('modal-confirm');
const modalCancel = document.getElementById('modal-cancel');
const helpOverlay = document.getElementById('help-overlay');
const helpTitle = document.getElementById('help-title');
const helpContent = document.getElementById('help-content');
const helpClose = document.getElementById('help-close');

let currentSection = 'ida';
let pendingAction = null;
let selectedDay = 0;

function isPending(value) {
  return !value || value.startsWith('PENDIENTE');
}

function pendingClass(value) {
  return isPending(value) ? 'pending' : '';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatPhone(phone) {
  return phone.replace(/\s/g, '');
}

function showConfirm(title, message, onConfirm) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  pendingAction = onConfirm;
  modalOverlay.hidden = false;
  modalConfirm.focus();
}

function hideConfirm() {
  modalOverlay.hidden = true;
  pendingAction = null;
}

function showHelp(topicKey) {
  const topic = HELP_TOPICS[topicKey];
  if (!topic) return;
  helpTitle.textContent = topic.title;
  helpContent.innerHTML = topic.content;
  helpOverlay.hidden = false;
  helpClose.focus();
}

modalConfirm.addEventListener('click', () => {
  if (pendingAction) pendingAction();
  hideConfirm();
});

modalCancel.addEventListener('click', hideConfirm);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) hideConfirm();
});

helpClose.addEventListener('click', () => {
  helpOverlay.hidden = true;
});

helpOverlay.addEventListener('click', (e) => {
  if (e.target === helpOverlay) helpOverlay.hidden = true;
});

function bindActionButtons(container) {
  container.querySelectorAll('[data-action="maps"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const url = btn.dataset.url;
      const name = btn.dataset.name || 'este sitio';
      const isLocation = btn.dataset.mapsType === 'location';
      showConfirm(
        isLocation ? '¿Abrir el mapa?' : '¿Abrir el mapa?',
        isLocation
          ? `Se abrirá Google Maps para ver dónde estáis: ${name}`
          : `Se abrirá Google Maps para ir a: ${name}`,
        () => { window.open(url, '_blank', 'noopener'); }
      );
    });
  });

  container.querySelectorAll('[data-action="phone"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const phone = btn.dataset.phone;
      const name = btn.dataset.name || 'este número';
      showConfirm(
        '¿Seguro que quieres llamar?',
        `Se marcará el teléfono de: ${name}`,
        () => { window.location.href = `tel:${formatPhone(phone)}`; }
      );
    });
  });

  container.querySelectorAll('[data-action="help"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      showHelp(btn.dataset.topic);
    });
  });

  container.querySelectorAll('[data-action="day-tab"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedDay = parseInt(btn.dataset.day, 10);
      render();
    });
  });
}

function mapsButton(name, url, label = '🗺️ Cómo ir (Google Maps)', mapsType = 'directions') {
  return `<button class="btn btn-maps" data-action="maps" data-url="${escapeHtml(url)}" data-name="${escapeHtml(name)}" data-maps-type="${mapsType}">${label}</button>`;
}

function locationButton(name, url) {
  return mapsButton(name, url, '📍 ¿Dónde estoy?', 'location');
}

function phoneButton(name, phone, label = '📞 Llamar para reservar') {
  if (!phone) return '';
  return `<button class="btn btn-phone" data-action="phone" data-phone="${escapeHtml(phone)}" data-name="${escapeHtml(name)}">${label}</button>`;
}

function hotelMapsUrl(h) {
  return h.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.mapsQuery)}`;
}

function renderIda() {
  const { locations, schedules } = TRIP;
  return `
    <h2 class="section-title">🚌 Ida a Madrid</h2>
    <p class="section-intro">${TRIP.dates.outbound}</p>

    <div class="card card-highlight">
      <p class="card-text"><strong>Recorrido:</strong> Casa → Bus Vilafranca → Sants → Tren AVE → Madrid Atocha → Hotel</p>
    </div>

    <div class="card">
      <h3 class="card-title"><span class="card-step-number">1</span> Salir de casa</h3>
      <p class="card-text">Salid con tiempo suficiente para no ir con prisas. Llevad DNI, billetes y maletas.</p>
      <div class="card-warning">⏰ Salid con al menos 30 minutos de margen antes de la hora del bus.</div>
    </div>

    <div class="card">
      <h3 class="card-title"><span class="card-step-number">2</span> Bus a Vilafranca</h3>
      <p class="card-text">Id a la parada de bus habitual de Vilafranca del Penedès.</p>
      <p class="card-time ${pendingClass(schedules.busVilafranca)}">🕐 ${escapeHtml(schedules.busVilafranca)}</p>
      ${mapsButton(locations.busVilafranca.name, locations.busVilafranca.mapsUrl)}
    </div>

    <div class="card">
      <h3 class="card-title"><span class="card-step-number">3</span> Bus Vilafranca → Sants</h3>
      <p class="card-text">El autobús os dejará en la <strong>Estación de Autobuses de Sants</strong>, muy cerca de la estación de tren.</p>
      <p class="card-note">💡 Desde la estación de buses hay señales para ir a Sants (trenes). Son 5-10 minutos andando.</p>
      ${mapsButton(locations.santsBus.name, locations.santsBus.mapsUrl)}
    </div>

    <div class="card">
      <h3 class="card-title"><span class="card-step-number">4</span> Tren AVE Sants → Madrid Atocha</h3>
      <p class="card-text">En Sants, buscad el andén del tren de alta velocidad (AVE) con destino <strong>Madrid Atocha</strong>.</p>
      <p class="card-time ${pendingClass(schedules.trainSantsMadrid)}">🕐 ${escapeHtml(schedules.trainSantsMadrid)}</p>
      <div class="card-note">💡 Llegad a Sants con 20-30 min de antelación. El tren AVE sale puntual.</div>
      ${mapsButton(locations.santsTrain.name, locations.santsTrain.mapsUrl)}
    </div>

    <div class="card">
      <h3 class="card-title"><span class="card-step-number">5</span> Llegada a Madrid Atocha</h3>
      <p class="card-text">Al bajar del tren en Atocha, seguid las señales de salida. Desde ahí podéis ir al hotel en taxi o metro.</p>
      ${locationButton(locations.atocha.name, locations.atocha.locationUrl)}
      <div class="btn-group">
        <button class="btn btn-taxi" data-action="help" data-topic="taxi">🚕 Cómo pedir un taxi</button>
      </div>
    </div>

    <div class="card">
      <h3 class="card-title"><span class="card-step-number">6</span> Ir al hotel</h3>
      <p class="card-text">Dejad las maletas en el hotel. Si llegáis antes de la hora de entrada, la recepción suele guardarlas.</p>
      <p class="card-text"><strong>Hostal:</strong> ${escapeHtml(TRIP.hotel.name)}</p>
      <p class="card-text"><strong>Dirección:</strong> ${escapeHtml(TRIP.hotel.address)}</p>
      ${TRIP.hotel.phone ? phoneButton(TRIP.hotel.name, TRIP.hotel.phone, '📞 Llamar al hostal') : ''}
      ${mapsButton(TRIP.hotel.name, hotelMapsUrl(TRIP.hotel))}
    </div>

    <div class="btn-group">
      <button class="btn btn-help" data-action="help" data-topic="emergency">🆘 Teléfonos de emergencia</button>
      <button class="btn btn-help" data-action="help" data-topic="app">❓ Cómo usar esta app</button>
    </div>
  `;
}

function renderHotel() {
  const h = TRIP.hotel;
  return `
    <h2 class="section-title">🏨 Hostal</h2>
    <p class="section-intro">Hostal Madrid — 3 noches en pleno centro</p>

    <div class="card card-highlight">
      <h3 class="card-title">${escapeHtml(h.name)}</h3>
      <p class="card-text"><strong>📍 Dirección:</strong> ${escapeHtml(h.address)}</p>
      <p class="card-text"><strong>📞 Teléfono:</strong> 915 22 00 60</p>
      <p class="card-text"><strong>📅 Entrada:</strong> ${escapeHtml(h.checkIn)}</p>
      <p class="card-text"><strong>📅 Salida:</strong> ${escapeHtml(h.checkOut)} (jueves 16)</p>
      <p class="card-note">${escapeHtml(h.notes)}</p>
      <div class="btn-group">
        ${mapsButton(h.name, hotelMapsUrl(h))}
        ${h.phone ? phoneButton(h.name, h.phone, '📞 Llamar al hostal') : ''}
      </div>
    </div>

    <div class="card">
      <h3 class="card-title">Del hostal a Atocha (para la vuelta)</h3>
      <p class="card-text">El jueves 16, salid del hotel con tiempo para llegar a Atocha con margen antes del tren.</p>
      <p class="card-warning">⏰ Calculad 45-60 minutos desde el hotel hasta estar en el andén de Atocha.</p>
      ${mapsButton('Madrid Atocha', TRIP.locations.atocha.mapsUrl)}
      <button class="btn btn-taxi" data-action="help" data-topic="taxi">🚕 Cómo pedir un taxi</button>
    </div>

    <div class="card">
      <h3 class="card-title">Consejos del hostal</h3>
      <ul class="help-list">
        <li><strong>Recepción</strong>El personal os orientará sobre dónde comer, visitar y cómo moveros por el centro.</li>
        <li><strong>Ubicación</strong>Estáis entre Puerta del Sol y Plaza Mayor, lo más céntrico de Madrid.</li>
        <li><strong>WiFi</strong>Pedid la contraseña del WiFi al llegar.</li>
        <li><strong>Lavandería</strong>El hostal dispone de lavandería para huéspedes — preguntad en recepción.</li>
        <li><strong>Caja fuerte (opcional)</strong>Guardad documentos y objetos de valor si el hostal dispone de ella.</li>
      </ul>
    </div>
  `;
}

function renderRestaurantes() {
  const cards = TRIP.restaurants.map((r) => `
    <div class="card place-card">
      <p class="place-type">${escapeHtml(r.type)}</p>
      <h3 class="card-title">${escapeHtml(r.name)}</h3>
      <p class="card-text">${escapeHtml(r.description)}</p>
      <p class="card-text"><strong>📍</strong> ${escapeHtml(r.address)}</p>
      ${r.reserve ? '<p class="card-note">📞 Se recomienda reservar con antelación</p>' : '<p class="card-note">Sin necesidad de reserva</p>'}
      <div class="btn-group">
        ${mapsButton(r.name, r.mapsUrl)}
        ${phoneButton(r.name, r.phone)}
      </div>
    </div>
  `).join('');

  return `
    <h2 class="section-title">🍽️ Restaurantes</h2>
    <p class="section-intro">Sitios de referencia para comer en Madrid. Pulsad "Llamar" solo si queréis reservar.</p>
    ${cards}
    <div class="btn-group">
      <button class="btn btn-help" data-action="help" data-topic="maps">🗺️ Cómo usar Google Maps</button>
    </div>
  `;
}

function renderOcio() {
  const dayTabs = TRIP.days.map((d, i) => `
    <button class="day-tab ${i === selectedDay ? 'active' : ''}" data-action="day-tab" data-day="${i}">${escapeHtml(d.label)}</button>
  `).join('');

  const day = TRIP.days[selectedDay];
  const dayPlan = day.activities.map((a) => `<li>${escapeHtml(a)}</li>`).join('');

  const placeCards = TRIP.ocio.map((p) => `
    <div class="card place-card">
      <p class="place-type">${escapeHtml(p.type)}</p>
      <h3 class="card-title">${escapeHtml(p.name)}</h3>
      <p class="card-text">${escapeHtml(p.description)}</p>
      <p class="card-text"><strong>📍</strong> ${escapeHtml(p.address)}</p>
      ${p.tips ? `<p class="card-note">💡 ${escapeHtml(p.tips)}</p>` : ''}
      <div class="btn-group">
        ${mapsButton(p.name, p.mapsUrl)}
        ${p.phone ? phoneButton(p.name, p.phone) : ''}
      </div>
    </div>
  `).join('');

  return `
    <h2 class="section-title">🎭 Ocio y plan del día</h2>
    <p class="section-intro">Lugares interesantes y plan sugerido para cada día</p>

    <div class="day-tabs">${dayTabs}</div>

    <div class="card card-highlight">
      <h3 class="card-title">${escapeHtml(day.title)}</h3>
      <ul class="help-list">${dayPlan}</ul>
    </div>

    <h3 class="section-title" style="font-size: 22px; margin-top: 8px;">Lugares recomendados</h3>
    ${placeCards}

    <div class="btn-group">
      <button class="btn btn-taxi" data-action="help" data-topic="taxi">🚕 Cómo pedir un taxi</button>
      <button class="btn btn-help" data-action="help" data-topic="emergency">🆘 Emergencias</button>
    </div>
  `;
}

function renderVuelta() {
  const { locations, schedules } = TRIP;
  return `
    <h2 class="section-title">🏠 Vuelta a casa</h2>
    <p class="section-intro">${TRIP.dates.return}</p>

    <div class="card card-highlight">
      <p class="card-text"><strong>Recorrido:</strong> Hotel → Madrid Atocha → Sants (tren) → Sants (bus) → Vilafranca → Casa</p>
    </div>

    <div class="card">
      <h3 class="card-title"><span class="card-step-number">1</span> Check-out del hotel</h3>
      <p class="card-text">Dejad la habitación antes de las 12:00. Dejad las maletas en recepción si salís antes.</p>
      <p class="card-warning">⏰ Desayunad con tiempo. No dejéis nada en la habitación.</p>
    </div>

    <div class="card">
      <h3 class="card-title"><span class="card-step-number">2</span> Del hotel a Madrid Atocha</h3>
      <p class="card-text">Id en taxi o transporte público a la estación de Atocha. Llevad tiempo de sobra.</p>
      <p class="card-warning">⏰ Salid del hotel al menos 1 hora antes de la hora del tren.</p>
      ${mapsButton(locations.atocha.name, locations.atocha.mapsUrl)}
      <button class="btn btn-taxi" data-action="help" data-topic="taxi">🚕 Cómo pedir un taxi</button>
    </div>

    <div class="card">
      <h3 class="card-title"><span class="card-step-number">3</span> Tren AVE Madrid Atocha → Sants</h3>
      <p class="card-text">Buscad el andén del tren con destino <strong>Barcelona Sants</strong>.</p>
      <p class="card-time ${pendingClass(schedules.trainMadridSants)}">🕐 ${escapeHtml(schedules.trainMadridSants)}</p>
      <div class="card-note">💡 Estad en el andén 20 minutos antes de la salida.</div>
    </div>

    <div class="card">
      <h3 class="card-title"><span class="card-step-number">4</span> De Sants (tren) a Sants (bus)</h3>
      <p class="card-text">Al bajar del tren en Sants, seguid las señales hacia la <strong>Estación de Autobuses</strong>. Está muy cerca, 5-10 minutos andando.</p>
      ${mapsButton(locations.santsBus.name, locations.santsBus.mapsUrl)}
    </div>

    <div class="card">
      <h3 class="card-title"><span class="card-step-number">5</span> Bus Sants → Vilafranca</h3>
      <p class="card-text">Coged el autobús con destino <strong>Vilafranca del Penedès</strong>.</p>
      <p class="card-time ${pendingClass(schedules.busSantsVilafranca)}">🕐 ${escapeHtml(schedules.busSantsVilafranca)}</p>
      <div class="card-note">💡 Comprad el billete con antelación si es posible. Guardad los billetes hasta llegar.</div>
    </div>

    <div class="card">
      <h3 class="card-title"><span class="card-step-number">6</span> Llegada a Vilafranca</h3>
      <p class="card-text">¡Ya estáis en casa! El bus os dejará en la estación de autobuses de Vilafranca.</p>
      ${mapsButton(locations.busVilafranca.name, locations.busVilafranca.mapsUrl)}
    </div>

    <div class="card">
      <h3 class="card-title">Taxis de referencia</h3>
      <p class="card-text"><strong>Madrid:</strong></p>
      <div class="btn-group">
        ${TRIP.taxis.madrid.map((t) => phoneButton(t.name, t.phone)).join('')}
      </div>
      <p class="card-text" style="margin-top: 16px;"><strong>Barcelona (Sants):</strong></p>
      <div class="btn-group">
        ${TRIP.taxis.barcelona.map((t) => phoneButton(t.name, t.phone)).join('')}
      </div>
    </div>

    <div class="btn-group">
      <button class="btn btn-help" data-action="help" data-topic="emergency">🆘 Teléfonos de emergencia</button>
    </div>
  `;
}

const RENDERERS = {
  ida: renderIda,
  hotel: renderHotel,
  restaurantes: renderRestaurantes,
  ocio: renderOcio,
  vuelta: renderVuelta,
};

function scrollToTop() {
  mainContent.scrollTop = 0;
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function render() {
  const renderer = RENDERERS[currentSection];
  mainContent.innerHTML = renderer();
  bindActionButtons(mainContent);

  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.section === currentSection);
  });

  scrollToTop();
}

document.querySelectorAll('.nav-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    currentSection = btn.dataset.section;
    render();
  });
});

// PWA install prompt
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallBanner();
});

function showInstallBanner() {
  if (document.getElementById('install-banner')) return;
  const banner = document.createElement('div');
  banner.id = 'install-banner';
  banner.className = 'install-banner';
  banner.innerHTML = `
    <p>📲 Instalad esta guía en el móvil para usarla sin internet</p>
    <button class="btn" id="install-btn">Instalar en el móvil</button>
  `;
  mainContent.insertBefore(banner, mainContent.firstChild);

  document.getElementById('install-btn').addEventListener('click', async () => {
    if (!deferredPrompt) {
      showHelp('app');
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    banner.remove();
  });
}

render();

// Register service worker via vite-plugin-pwa
import { registerSW } from 'virtual:pwa-register';

registerSW({
  immediate: true,
  onOfflineReady() {
    console.log('App lista para usar sin conexión');
  },
});
