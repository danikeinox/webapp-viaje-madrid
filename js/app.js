import '@fontsource/atkinson-hyperlegible/400.css';
import '@fontsource/atkinson-hyperlegible/700.css';
import { registerSW } from 'virtual:pwa-register';
import { TRIP, HELP_TOPICS } from './data.js';

const $ = (id) => document.getElementById(id);
const mainContent = $('main-content');
const modalOverlay = $('modal-overlay');
const helpOverlay = $('help-overlay');
const announcer = $('announcer');

const state = {
  section: 'hoy',
  route: 'ida',
  day: 0,
  cuisine: 'todos',
};

/* ---------- Utilidades ---------- */

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text ?? '';
  return div.innerHTML;
}

function icon(name) {
  return `<svg class="i" aria-hidden="true"><use href="#i-${name}"/></svg>`;
}

function store(key, value) {
  try {
    if (value === undefined) return JSON.parse(localStorage.getItem(key));
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch { /* sin almacenamiento: la app sigue funcionando */ }
  return null;
}

function announce(text) {
  announcer.textContent = '';
  setTimeout(() => { announcer.textContent = text; }, 50);
}

const MONTHS_DAY = { start: new Date(2026, 9, 13), end: new Date(2026, 9, 15) };

function startOfToday() {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}

function daysBetween(a, b) {
  return Math.round((b - a) / 86400000);
}

function todayIso() {
  const t = startOfToday();
  const mm = String(t.getMonth() + 1).padStart(2, '0');
  const dd = String(t.getDate()).padStart(2, '0');
  return `${t.getFullYear()}-${mm}-${dd}`;
}

/* ---------- Horas de los billetes (se guardan en el móvil) ---------- */

function getTime(key) {
  const saved = store('madrid.times');
  return (saved && saved[key]) || TRIP.schedules[key] || '';
}

function setTime(key, value) {
  const saved = store('madrid.times') || {};
  if (value) saved[key] = value;
  else delete saved[key];
  store('madrid.times', saved);
}

function timeBox(key) {
  const value = getTime(key);
  const label = TRIP.scheduleLabels[key];
  const input = `<input type="time" data-time="${key}" value="${escapeHtml(value)}" aria-label="${escapeHtml(label)}">`;
  if (value) {
    return `<label class="timebox set">${icon('clock')}<span><span class="timebox-time">${escapeHtml(value)}</span><span class="timebox-hint">${escapeHtml(label)}. Tocad para cambiarla</span></span>${input}</label>`;
  }
  return `<label class="timebox pending">${icon('pencil')}<span>Apuntar la hora<span class="timebox-hint">${escapeHtml(label)}</span></span>${input}</label>`;
}

/* ---------- Ventanas (confirmar / ayuda) ---------- */

let pendingAction = null;
let lastFocus = null;
let openOverlay = null;

function openDialog(overlay, focusEl) {
  lastFocus = document.activeElement;
  openOverlay = overlay;
  overlay.hidden = false;
  overlay.scrollTop = 0;
  focusEl.focus({ preventScroll: true });
}

function closeDialog() {
  if (!openOverlay) return;
  openOverlay.hidden = true;
  openOverlay = null;
  pendingAction = null;
  if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
}

function showConfirm(title, message, confirmLabel, onConfirm) {
  $('modal-title').textContent = title;
  $('modal-message').textContent = message;
  $('modal-confirm').textContent = confirmLabel;
  pendingAction = onConfirm;
  openDialog(modalOverlay, $('modal-cancel'));
}

function showHelp(topicKey) {
  const topic = HELP_TOPICS[topicKey];
  if (!topic) return;
  $('help-title').textContent = topic.title;
  $('help-content').innerHTML = topic.content;
  openDialog(helpOverlay, $('help-title'));
}

$('modal-confirm').addEventListener('click', () => {
  const action = pendingAction;
  closeDialog();
  if (action) action();
});
$('modal-cancel').addEventListener('click', closeDialog);
$('help-close').addEventListener('click', closeDialog);
[modalOverlay, helpOverlay].forEach((o) => o.addEventListener('click', (e) => { if (e.target === o) closeDialog(); }));

document.addEventListener('keydown', (e) => {
  if (!openOverlay) return;
  if (e.key === 'Escape') { closeDialog(); return; }
  if (e.key === 'Tab') {
    const f = [...openOverlay.querySelectorAll('button:not([hidden])')];
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* ---------- Botones reutilizables ---------- */

function mapsBtn(name, url, label = 'Cómo ir', type = 'directions') {
  return `<button class="btn btn-maps" type="button" data-action="maps" data-url="${escapeHtml(url)}" data-name="${escapeHtml(name)}" data-type="${type}">${icon('pin')}<span>${escapeHtml(label)}</span></button>`;
}

function phoneBtn(name, phone, label = 'Llamar') {
  if (!phone) return '';
  return `<button class="btn btn-phone" type="button" data-action="phone" data-phone="${escapeHtml(phone)}" data-name="${escapeHtml(name)}">${icon('phone')}<span>${escapeHtml(label)}</span></button>`;
}

function webBtn(name, url, label = 'Abrir la web') {
  return `<button class="btn btn-outline" type="button" data-action="web" data-url="${escapeHtml(url)}" data-name="${escapeHtml(name)}">${icon('globe')}<span>${escapeHtml(label)}</span></button>`;
}

function helpBtn(topic, label, cls = 'btn-outline', ic = 'help') {
  return `<button class="btn ${cls}" type="button" data-action="help" data-topic="${topic}">${icon(ic)}<span>${escapeHtml(label)}</span></button>`;
}

const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const note = (text) => `<div class="note">${icon('bulb')}<span>${escapeHtml(text)}</span></div>`;
const warn = (text) => `<div class="warn">${icon('alert')}<span>${escapeHtml(text)}</span></div>`;

function facts(rows) {
  const items = rows.filter(([, v]) => v).map(([k, v]) => `<div><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`).join('');
  return items ? `<dl class="facts">${items}</dl>` : '';
}

/* ---------- Pantalla: Hoy ---------- */

function ticketHero() {
  const today = startOfToday();
  const toStart = daysBetween(today, MONTHS_DAY.start);
  const toEnd = daysBetween(today, MONTHS_DAY.end);
  let big;
  let text;
  let sub;
  if (toStart > 0) {
    big = String(toStart);
    text = toStart === 1 ? 'día para salir' : 'días para salir';
    sub = 'Salís el martes 13 de octubre';
  } else if (toEnd >= 0) {
    const n = 3 - toEnd;
    big = String(n);
    text = `Hoy es el día ${n} de 3`;
    sub = TRIP.days[Math.min(n - 1, 2)].weekday;
  } else {
    big = '✓';
    text = 'Viaje terminado';
    sub = 'Esperamos que haya ido muy bien';
  }
  return `
    <section class="ticket" aria-label="Resumen del viaje">
      <div class="ticket-top">
        <div class="ticket-route">
          <span>Vilafranca</span><span class="ticket-route-line" aria-hidden="true"></span>${icon('train')}<span class="ticket-route-line" aria-hidden="true"></span><span>Madrid</span>
        </div>
        <p class="ticket-dates">Del martes 13 al jueves 15 de octubre · 2 noches</p>
      </div>
      <div class="ticket-cut" aria-hidden="true"></div>
      <div class="ticket-bottom">
        <span class="ticket-count" aria-hidden="true">${big}</span>
        <p class="ticket-count-text">${escapeHtml(text)}<br><span class="ticket-count-sub">${escapeHtml(sub)}</span></p>
      </div>
    </section>`;
}

function renderHoy() {
  const day = TRIP.days[state.day];
  const tabs = TRIP.days.map((d, i) => `
    <button class="seg-btn" type="button" data-action="day" data-day="${i}" aria-pressed="${i === state.day}">${escapeHtml(d.weekday)}</button>`).join('');

  const items = day.items.map((it) => `
    <li class="agenda-item">
      <span class="agenda-part">${escapeHtml(it.part)}</span>
      <div>
        <p class="agenda-text">${escapeHtml(it.text)}</p>
        ${it.go && it.go.help ? `<button class="btn btn-outline" type="button" data-action="help" data-topic="${it.go.help}">${icon('help')}<span>${escapeHtml(it.goLabel)}</span></button>` : it.go ? `<button class="btn btn-outline" type="button" data-action="go" data-section="${it.go.section}" ${it.go.route ? `data-route="${it.go.route}"` : ''}>${icon('arrow')}<span>${escapeHtml(it.goLabel)}</span></button>` : ''}
      </div>
    </li>`).join('');

  const taxi = TRIP.taxis.madrid[0];
  return `
    <h2 class="page-title" tabindex="-1">Hoy</h2>
    <p class="page-intro">Vuestro plan, día a día.</p>
    <div id="install-slot"></div>
    ${ticketHero()}

    <div class="segmented" role="group" aria-label="Elegir día">${tabs}</div>
    <section class="panel" aria-label="Plan del ${escapeHtml(day.weekday)}">
      <h3 class="panel-title">${escapeHtml(day.weekday)}: ${escapeHtml(day.title)}</h3>
      <ul class="agenda">${items}</ul>
    </section>

    <section class="panel">
      <h3 class="panel-title">De noche, mejor en Bolt</h3>
      <p>Para ir a cenar o volver al hostal por la noche, usad Bolt, Uber o Cabify. Un viaje cuesta aproximadamente de 7 a 15 €. Antes de subir, comprobad la matrícula y el modelo del coche.</p>
      <div class="btn-group">${helpBtn('apps', 'Cómo usar Bolt paso a paso', 'btn-taxi', 'taxi')}</div>
    </section>

    <h3 class="group-title">El tiempo en Madrid</h3>
    <div id="weather-box"><p class="weather-note">Cargando previsión…</p></div>
    ${note('Por la noche refresca, aunque de día haga calor. Llevad una chaqueta o un jersey en la mochila, sobre todo para la cena, el teatro y la vuelta al hostal.')}

    <h3 class="group-title">Ayuda rápida</h3>
    <div class="quick">
      ${phoneBtn(TRIP.hotel.name, TRIP.hotel.phone, 'Llamar al hostal')}
      ${phoneBtn(taxi.name, taxi.phone, 'Pedir taxi')}
      ${helpBtn('emergency', 'Emergencias 112', 'btn-sos', 'sos')}
      ${helpBtn('app', 'Cómo usar la guía')}
    </div>`;
}

/* ---------- Tiempo (se descarga con internet y se guarda para verlo sin conexión) ---------- */

const WEATHER = {
  0: ['Despejado', 'sun'], 1: ['Casi despejado', 'sun'], 2: ['Nubes y claros', 'cloud'], 3: ['Nublado', 'cloud'],
  45: ['Niebla', 'cloud'], 48: ['Niebla', 'cloud'],
  51: ['Llovizna', 'rain'], 53: ['Llovizna', 'rain'], 55: ['Llovizna', 'rain'],
  61: ['Lluvia', 'rain'], 63: ['Lluvia', 'rain'], 65: ['Lluvia fuerte', 'rain'],
  80: ['Chubascos', 'rain'], 81: ['Chubascos', 'rain'], 82: ['Chubascos fuertes', 'rain'],
  95: ['Tormenta', 'rain'], 96: ['Tormenta', 'rain'], 99: ['Tormenta', 'rain'],
};

function weatherHtml(data, savedAt, offline) {
  const cols = data.time.map((date, i) => {
    const [label, ic] = WEATHER[data.weathercode[i]] || ['Variable', 'cloud'];
    const d = TRIP.days.find((x) => x.date === date);
    return `
      <div class="weather-day ${date === todayIso() ? 'today' : ''}">
        <div class="weather-name">${escapeHtml(d ? d.weekday : date)}</div>
        ${icon(ic)}
        <div class="weather-temp">${Math.round(data.temperature_2m_max[i])}° / ${Math.round(data.temperature_2m_min[i])}°</div>
        <div class="weather-rain">${escapeHtml(label)}<br>Lluvia: ${data.precipitation_probability_max[i] ?? 0}%</div>
      </div>`;
  }).join('');
  const when = new Date(savedAt).toLocaleString('es-ES', { weekday: 'long', hour: '2-digit', minute: '2-digit' });
  const msg = offline ? `Sin conexión. Última previsión guardada: ${when}.` : `Previsión actualizada: ${when}.`;
  return `<div class="weather">${cols}</div><p class="weather-note">${escapeHtml(msg)} Máxima / mínima.</p>`;
}

async function loadWeather() {
  const box = $('weather-box');
  if (!box) return;
  const cached = store('madrid.weather');
  if (cached) box.innerHTML = weatherHtml(cached.data, cached.savedAt, true);
  try {
    const { lat, lon } = TRIP.weather;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMadrid&start_date=${TRIP.start}&end_date=${TRIP.end}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('bad status');
    const json = await res.json();
    const entry = { data: json.daily, savedAt: Date.now() };
    store('madrid.weather', entry);
    const live = $('weather-box');
    if (live) live.innerHTML = weatherHtml(entry.data, entry.savedAt, false);
  } catch {
    const live = $('weather-box');
    if (live && !cached) live.innerHTML = '<p class="weather-note">La previsión se verá cuando tengáis internet. Mirad el cielo y llevad un paraguas pequeño por si acaso.</p>';
  }
}

/* ---------- Pantalla: Trayecto ---------- */

function renderStep(step) {
  const parts = [`<p>${escapeHtml(step.text)}</p>`];
  if (step.time) parts.push(timeBox(step.time));
  if (step.facts) parts.push(facts(step.facts));
  if (step.time) parts.push(note('El billete está guardado en WhatsApp. Abridlo antes de llegar al control y enseñadlo desde el móvil.'));
  if (step.warn) parts.push(warn(step.warn));
  if (step.tip) parts.push(note(step.tip));
  const btns = [];
  if (step.location) btns.push(mapsBtn(TRIP.locations.atocha.name, TRIP.locations.atocha.locationUrl, '¿Dónde estoy?', 'location'));
  if (step.map) btns.push(mapsBtn(TRIP.locations[step.map].name, TRIP.locations[step.map].mapsUrl));
  if (step.hotel) {
    btns.push(mapsBtn(TRIP.hotel.name, TRIP.hotel.mapsUrl));
    btns.push(phoneBtn(TRIP.hotel.name, TRIP.hotel.phone, 'Llamar al hostal'));
  }
  if (step.go) btns.push(`<button class="btn btn-outline" type="button" data-action="go" data-section="${step.go.section}">${icon('arrow')}<span>${escapeHtml(step.go.label)}</span></button>`);
  if (step.taxi) btns.push(helpBtn('taxi', 'Cómo pedir un taxi', 'btn-taxi', 'taxi'));
  (step.help || []).forEach(([topic, label]) => btns.push(helpBtn(topic, label, 'btn-outline', 'train')));
  if (step.taxiBarcelona) btns.push(phoneBtn(TRIP.taxis.barcelona[0].name, TRIP.taxis.barcelona[0].phone, 'Llamar a un taxi en Barcelona'));
  return `
    <li class="step">
      <h3 class="step-title">${escapeHtml(step.title)}</h3>
      <div class="step-body">${parts.join('')}${btns.length ? `<div class="btn-group">${btns.join('')}</div>` : ''}</div>
    </li>`;
}

function renderTrayecto() {
  const r = TRIP.routes[state.route];
  const tabs = [['ida', 'Ida', 'Martes 13'], ['vuelta', 'Vuelta', 'Jueves 15']].map(([k, l, d]) => `
    <button class="seg-btn" type="button" data-action="route" data-route="${k}" aria-pressed="${state.route === k}">${l}<small>${d}</small></button>`).join('');
  return `
    <h2 class="page-title" tabindex="-1">${escapeHtml(r.title)}</h2>
    <p class="page-intro">${escapeHtml(r.summary)}</p>
    <div class="segmented" role="group" aria-label="Elegir trayecto">${tabs}</div>
    <ol class="steps">${r.steps.map(renderStep).join('')}</ol>
    <div class="btn-group">${helpBtn('emergency', 'Teléfonos de emergencia', 'btn-sos', 'sos')}</div>`;
}

/* ---------- Pantalla: Hostal ---------- */

function renderHostal() {
  const h = TRIP.hotel;
  return `
    <h2 class="page-title" tabindex="-1">Hostal</h2>
    <p class="page-intro">2 noches, del martes 13 al jueves 15.</p>
    <section class="panel">
      <h3 class="panel-title">${escapeHtml(h.name)}</h3>
      ${facts([
        ['Dirección', h.address],
        ['Teléfono', h.phoneText],
        ['Entrada', `${h.checkIn} (martes 13)`],
        ['Salida', `${h.checkOut} (jueves 15)`],
        ['Recepción', h.receptionHours],
      ])}
      <p>${escapeHtml(h.notes)}</p>
      ${warn(h.verify)}
      <div class="btn-group">
        ${phoneBtn(h.name, h.phone, 'Llamar al hostal')}
        ${mapsBtn(h.name, h.mapsUrl)}
        ${webBtn(h.name, h.website, 'Web del hostal')}
      </div>
    </section>

    <section class="panel">
      <h3 class="panel-title">Del hostal a la estación (jueves)</h3>
      <p>Salid del hostal al menos 1 hora y media antes del tren. Atocha es una estación grande y con control de equipaje.</p>
      <div class="btn-group">
        ${mapsBtn(TRIP.locations.atocha.name, TRIP.locations.atocha.mapsUrl)}
        ${helpBtn('taxi', 'Cómo pedir un taxi', 'btn-taxi', 'taxi')}
        ${helpBtn('apps', 'Moverse con Bolt', 'btn-taxi', 'taxi')}
        ${helpBtn('metro', 'Ir en metro')}
      </div>
    </section>

    <section class="panel">
      <h3 class="panel-title">Consejos</h3>
      <ul class="help-list">
        <li><strong>WiFi</strong>Pedid la contraseña en recepción al llegar.</li>
        <li><strong>Antes de salir</strong>Coged la llave y una tarjeta del hostal con la dirección por si os perdéis.</li>
        <li><strong>Ubicación</strong>Estáis entre la Puerta del Sol y la Plaza Mayor: casi todo se hace andando.</li>
      </ul>
    </section>`;
}

/* ---------- Pantallas: Comer y Ver ---------- */

function placeCard(p, extra = '') {
  return `
    <section class="panel">
      <p class="place-type">${escapeHtml(p.type)}</p>
      <h3 class="panel-title">${escapeHtml(p.name)}</h3>
      ${p.cuisines ? `<p class="tags">${p.cuisines.map((k) => `<span class="tag">${escapeHtml(TRIP.cuisines.find((c) => c.key === k).label)}</span>`).join('')}</p>` : ''}
      <p>${escapeHtml(p.description)}</p>
      ${facts([['Dirección', p.address], ['Horario', p.hours], ['Vuestro sitio', p.seats], ['Precio', p.price], ['Tarjeta de discapacidad', p.disability], ['Teléfono', p.phone ? p.phone.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4') : '']])}
      ${p.warning ? warn(p.warning) : ''}
      ${p.tips ? note(p.tips) : ''}
      ${extra}
      ${p.verify ? '<p class="verify">Horario y datos sin confirmar en la web oficial. Mejor llamar antes de ir.</p>' : ''}
      <div class="btn-group">
        ${mapsBtn(p.name, p.mapsUrl)}
        ${phoneBtn(p.name, p.phone, p.reserve ? 'Llamar para reservar' : 'Llamar')}
        ${p.web ? webBtn(p.name, p.web, 'Web y entradas') : ''}
      </div>
    </section>`;
}

function renderComer() {
  const reserveNote = (r) => (r.reserve ? note('Conviene reservar con antelación.') : note('No hace falta reservar.'));
  const options = [{ key: 'todos', label: 'Todos los tipos' }, ...TRIP.cuisines]
    .map((c) => `<option value="${c.key}" ${state.cuisine === c.key ? 'selected' : ''}>${escapeHtml(c.label)}</option>`).join('');
  const list = TRIP.restaurants.filter((r) => state.cuisine === 'todos' || r.cuisines.includes(state.cuisine));
  const current = TRIP.cuisines.find((c) => c.key === state.cuisine);

  let search = '';
  if (current) {
    const url = maps(`${current.search} cerca de ${TRIP.hotel.address}`);
    search = `
      <section class="panel panel-search">
        <h3 class="panel-title">${list.length ? 'Más sitios' : 'Buscar'}: ${escapeHtml(current.label.toLowerCase())}</h3>
        <p>${list.length ? 'Podéis ver más opciones de este tipo cerca del hostal.' : 'Todavía no tenemos recomendados de este tipo. Podéis buscarlos en el mapa, cerca del hostal.'} Mirad las estrellas y los precios.</p>
        <div class="btn-group">${mapsBtn(`${current.label} cerca del hostal`, url, 'Buscar cerca del hostal')}</div>
      </section>`;
  }
  return `
    <h2 class="page-title" tabindex="-1">Dónde comer</h2>
    <p class="page-intro">Sitios de confianza cerca del centro. Si queréis, escoged un tipo de comida. Pulsad "Llamar" solo si queréis reservar.</p>
    <label class="select-label" for="cuisine-select">Tipo de comida</label>
    <select class="select" id="cuisine-select" data-cuisine-select>${options}</select>
    <p class="chips-count" role="status">${list.length ? (list.length === 1 ? '1 sitio recomendado' : `${list.length} sitios recomendados`) : 'Sin recomendados de este tipo'}</p>
    ${list.map((r) => placeCard(r, reserveNote(r))).join('')}
    ${search}
    <div class="btn-group">${helpBtn('maps', 'Cómo usar Google Maps', 'btn-outline', 'pin')}</div>`;
}

function renderVer() {
  return `
    <h2 class="page-title" tabindex="-1">Qué ver</h2>
    <p class="page-intro">Lugares para pasear o visitar con calma. Los horarios son los de entre semana.</p>
    <section class="panel panel-search">
      <h3 class="panel-title">Con la tarjeta de discapacidad</h3>
      <p>${escapeHtml(TRIP.disability.intro)}</p>
      <ul class="help-list">${TRIP.disability.items.map((i) => `<li><strong>${escapeHtml(i.name)}</strong>${escapeHtml(i.text)}</li>`).join('')}</ul>
    </section>
    ${TRIP.ocio.map((p) => placeCard(p)).join('')}
    <div class="btn-group">
      ${helpBtn('taxi', 'Cómo pedir un taxi', 'btn-taxi', 'taxi')}
      ${helpBtn('apps', 'Moverse con Bolt', 'btn-taxi', 'taxi')}
      ${helpBtn('emergency', 'Emergencias', 'btn-sos', 'sos')}
    </div>`;
}

/* ---------- Navegación ---------- */

const RENDERERS = { hoy: renderHoy, trayecto: renderTrayecto, hostal: renderHostal, comer: renderComer, ver: renderVer };

function render({ resetScroll = true } = {}) {
  const y = mainContent.scrollTop;
  mainContent.innerHTML = RENDERERS[state.section]();
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    const on = btn.dataset.section === state.section;
    btn.classList.toggle('active', on);
    if (on) btn.setAttribute('aria-current', 'page');
    else btn.removeAttribute('aria-current');
  });
  mainContent.scrollTop = resetScroll ? 0 : y;
  if (state.section === 'hoy') { loadWeather(); mountInstall(); }
}

function go(section, route) {
  state.section = section;
  if (route) state.route = route;
  render();
  const title = mainContent.querySelector('.page-title');
  if (title) { title.focus({ preventScroll: true }); announce(title.textContent); }
}

document.querySelectorAll('.nav-btn').forEach((btn) => btn.addEventListener('click', () => go(btn.dataset.section)));

mainContent.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const d = el.dataset;
  switch (d.action) {
    case 'maps':
      showConfirm('¿Abrir el mapa?',
        d.type === 'location' ? `Se abrirá Google Maps para ver dónde estáis. Lugar: ${d.name}.` : `Se abrirá Google Maps para ir a: ${d.name}.`,
        'Sí, abrir el mapa', () => window.open(d.url, '_blank', 'noopener'));
      break;
    case 'phone':
      showConfirm('¿Llamar por teléfono?', `Se llamará a: ${d.name}.`, 'Sí, llamar',
        () => { window.location.href = `tel:${d.phone.replace(/\s/g, '')}`; });
      break;
    case 'web':
      showConfirm('¿Abrir la página web?', `Se abrirá la web de: ${d.name}. Necesita internet.`, 'Sí, abrir',
        () => window.open(d.url, '_blank', 'noopener'));
      break;
    case 'help': showHelp(d.topic); break;
    case 'day': state.day = Number(d.day); render({ resetScroll: false }); mainContent.querySelector(`[data-day="${state.day}"]`)?.focus(); break;
    case 'route': state.route = d.route; render(); mainContent.querySelector(`[data-route="${state.route}"]`)?.focus(); break;
    case 'go': go(d.section, d.route); break;
    default:
  }
});

mainContent.addEventListener('change', (e) => {
  if (e.target.matches('[data-cuisine-select]')) {
    state.cuisine = e.target.value;
    render({ resetScroll: false });
    $('cuisine-select')?.focus({ preventScroll: true });
    return;
  }
  const input = e.target.closest('input[data-time]');
  if (!input) return;
  setTime(input.dataset.time, input.value);
  render({ resetScroll: false });
  announce(input.value ? `Hora guardada: ${input.value}` : 'Hora borrada');
  mainContent.querySelector(`input[data-time="${input.dataset.time}"]`)?.focus({ preventScroll: true });
});

/* ---------- Tamaño de letra ---------- */

const SIZES = [['m', 'Letra normal'], ['l', 'Letra grande'], ['xl', 'Letra enorme']];

function applyTextSize(key) {
  const i = Math.max(0, SIZES.findIndex(([k]) => k === key));
  document.documentElement.dataset.text = SIZES[i][0];
  $('text-size-label').textContent = SIZES[i][1];
  return i;
}

let sizeIndex = applyTextSize(store('madrid.text') || 'm');
$('text-size-btn').addEventListener('click', () => {
  sizeIndex = applyTextSize(SIZES[(sizeIndex + 1) % SIZES.length][0]);
  store('madrid.text', SIZES[sizeIndex][0]);
  announce(SIZES[sizeIndex][1]);
});

/* ---------- Instalar la app ---------- */

let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  mountInstall();
});

function mountInstall() {
  const slot = $('install-slot');
  if (!slot || !deferredPrompt) return;
  slot.innerHTML = `
    <div class="install-banner">
      <p>Instalad la guía en el móvil para usarla sin internet.</p>
      <button class="btn btn-primary" id="install-btn" type="button">Instalar en el móvil</button>
    </div>`;
  $('install-btn').addEventListener('click', async () => {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    slot.innerHTML = '';
  });
}

/* ---------- Inicio ---------- */

const todayIndex = TRIP.days.findIndex((d) => d.date === todayIso());
state.day = todayIndex >= 0 ? todayIndex : 0;
render();

const [hashSection, hashArg] = location.hash.slice(1).split('=');
if (hashSection === 'comer' && hashArg) state.cuisine = hashArg;
if (RENDERERS[hashSection]) { state.section = hashSection; render(); }
if (location.hash.startsWith('#ayuda-')) showHelp(location.hash.slice(7));

registerSW({ immediate: true });
