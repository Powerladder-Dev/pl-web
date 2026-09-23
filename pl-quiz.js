/* Power Ladder - Interactive Quiz hub (Wix Custom Code build)
   Loaded with `defer` from the Head snippet, so it runs after every Body-end snippet
   (hub EN, hub TH, and one snippet per quiz) no matter their order in Wix. */
(function () {
  function all(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  var L = /(^|\/)th(\/|$)/.test(location.pathname) ? 'th' : 'en';

  // show one language only
  all('.plq[data-lang]').forEach(function (r) { r.hidden = r.getAttribute('data-lang') !== L; });
  var root = document.getElementById('plq-' + L);
  if (!root) return;

  // hide the Wix page body/footer that would otherwise sit on top of or above our content
  function hideWix() {
    ['PAGES_CONTAINER', 'SITE_FOOTER'].forEach(function (id) {
      var n = document.getElementById(id);
      if (n) n.style.setProperty('display', 'none', 'important');
    });
  }
  hideWix();
  var k = 0, iv = setInterval(function () { hideWix(); if (++k > 40) clearInterval(iv); }, 200);

  // gather the per-quiz detail snippets into this language's slot (they are our own nodes, not Wix's)
  var slot = root.querySelector('.plq-slot');
  var details = all('.plq-detail[data-lang="' + L + '"]');
  details.forEach(function (d) { d.hidden = false; slot.appendChild(d); });

  var hub = root.querySelector('.plq-hub'), cards = all('.card', root),
      input = root.querySelector('.plq-search'), empty = root.querySelector('.empty'),
      count = root.querySelector('.plq-n'), filter = 'all';

  function route(scroll) {
    var m = location.hash.match(/^#quiz\/([a-z0-9-]+)/), id = m && m[1], hit = false;
    details.forEach(function (d) { var on = d.getAttribute('data-quiz') === id; d.hidden = !on; if (on) hit = true; });
    hub.hidden = hit;
    if (scroll && (hit || location.hash === '#lab')) scrollTo(0, root.getBoundingClientRect().top + scrollY - 20);
  }

  function apply() {
    var q = (input.value || '').trim().toLowerCase(), n = 0;
    cards.forEach(function (c) {
      var topicOk = filter === 'all' || (' ' + c.getAttribute('data-topics') + ' ').indexOf(' ' + filter + ' ') > -1;
      var textOk = !q || (c.textContent + ' ' + (c.getAttribute('data-kw') || '')).toLowerCase().indexOf(q) > -1;
      c.hidden = !(topicOk && textOk);
      if (!c.hidden) n++;
    });
    count.textContent = n;
    empty.hidden = n > 0;
  }

  function setChip(v) {
    filter = v;
    all('[data-filter]', root).forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-filter') === v); });
    apply();
  }

  root.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.getAttribute('data-filter')) setChip(b.getAttribute('data-filter'));
    if (b.getAttribute('data-action') === 'resetsearch') { input.value = ''; setChip('all'); input.focus(); }
  });
  input.addEventListener('input', apply);
  addEventListener('hashchange', function () { route(true); });

  route(false);
  apply();
})();
