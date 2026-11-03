(function () {
  'use strict';

  // Menú móvil
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('is-open', open);
  }
  burger.addEventListener('click', function () {
    setMenu(burger.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); burger.focus(); }
  });

  // Cabecera más opaca al hacer scroll
  var header = document.querySelector('.header');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Pestañas de servicios (patrón ARIA tabs)
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
    tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab); });
    tab.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') n = tabs[0];
      if (e.key === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); selectTab(n, true); }
    });
  });

  // Las tarjetas abren su pestaña
  document.querySelectorAll('.card[data-tab]').forEach(function (card) {
    card.addEventListener('click', function () {
      var tab = document.getElementById('tab-' + card.dataset.tab);
      if (tab) selectTab(tab);
    });
  });

  // Copiar email
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.dataset.copy;
      var done = function () { btn.textContent = 'Copiado'; setTimeout(function () { btn.textContent = 'Copiar'; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { selectText(btn.previousElementSibling); });
      } else {
        selectText(btn.previousElementSibling);
      }
    });
  });
  function selectText(el) {
    var r = document.createRange(); r.selectNodeContents(el);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
  }

  // Formulario: prepara un email con los datos (la web es estática, sin servidor)
  var form = document.getElementById('form');
  var note = document.getElementById('form-note');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var required = form.querySelectorAll('[required]');
    var firstBad = null;
    required.forEach(function (f) {
      var bad = !f.value.trim() || (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
      f.setAttribute('aria-invalid', String(bad));
      if (bad && !firstBad) firstBad = f;
    });
    if (firstBad) {
      note.className = 'form__note is-error';
      note.textContent = 'Revise los campos marcados: nombre, un email válido y el mensaje son necesarios.';
      firstBad.focus();
      return;
    }
    var d = new FormData(form);
    var subject = 'Consulta web: ' + d.get('servicio') + ' – ' + d.get('nombre');
    var body = [
      'Nombre: ' + d.get('nombre'),
      'Teléfono: ' + (d.get('telefono') || '-'),
      'Email: ' + d.get('email'),
      'Embarcación y amarre: ' + (d.get('barco') || '-'),
      'Servicio: ' + d.get('servicio'),
      '',
      d.get('mensaje')
    ].join('\n');
    note.className = 'form__note is-ok';
    note.textContent = 'Abriendo su programa de correo. Si no se abre, escríbanos a info@palmamarine.es o llame al +34 629 575 142.';
    window.location.href = 'mailto:info@palmamarine.es?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
