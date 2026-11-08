/* dc-lite: a tiny runtime for the portfolio templates.
   Supports {{ path }} bindings in attributes and text, <sc-if value="{{ path }}">, onClick="{{ handler }}",
   a Component class with state/props/renderVals, and hash routing (#journey, #pawspal, ...). */
(function () {
  var RE = /\{\{\s*([\w.]+)\s*\}\}/g;
  var ONE = /^\s*\{\{\s*([\w.]+)\s*\}\}\s*$/;
  var PAGES = { home: '', journey: 'journey', paws: 'pawspal', anna: 'anna', sag: 'sagmill', titanic: 'titanic' };
  var SLUGS = {}; Object.keys(PAGES).forEach(function (k) { SLUGS[PAGES[k]] = k; });

  function get(o, p) { var v = o; p.split('.').forEach(function (k) { v = v == null ? undefined : v[k]; }); return v; }

  function DCLogic(props) { this.props = props || {}; this.state = {}; this.__rt = null; }
  DCLogic.prototype.setState = function (p, cb) {
    var next = typeof p === 'function' ? p(this.state) : p;
    this.state = Object.assign({}, this.state, next);
    if (this.__rt) this.__rt.update(cb); else if (cb) cb();
  };
  window.DCLogic = DCLogic;

  function Runtime(root, comp) {
    this.root = root; this.comp = comp; comp.__rt = this;
    this.ifs = []; this.attrs = []; this.texts = []; this.handlers = []; this.mounted = false;
    this.vals = {};
    this.walk(root);
  }
  Runtime.prototype.walk = function (node) {
    var self = this;
    if (node.nodeType === 1) {
      if (node.tagName === 'SC-IF') {
        var m = (node.getAttribute('value') || '').match(ONE);
        if (m) self.ifs.push({ el: node, path: m[1], last: undefined });
        node.removeAttribute('value'); node.removeAttribute('hint-placeholder-val');
      } else {
        Array.prototype.slice.call(node.attributes).forEach(function (a) {
          if (a.value.indexOf('{{') < 0) return;
          var m = a.value.match(ONE);
          if (/^on/i.test(a.name) && m) {
            node.removeAttribute(a.name);
            node.addEventListener(a.name.slice(2).toLowerCase(), function (e) {
              var f = get(self.vals, m[1]); if (typeof f === 'function') f(e);
            });
          } else {
            self.attrs.push({ el: node, name: a.name, tpl: a.value, one: m ? m[1] : null, last: undefined });
          }
        });
      }
      Array.prototype.slice.call(node.childNodes).forEach(function (c) { self.walk(c); });
    } else if (node.nodeType === 3 && node.nodeValue.indexOf('{{') >= 0) {
      self.texts.push({ node: node, tpl: node.nodeValue, last: undefined });
    }
  };
  Runtime.prototype.update = function (cb) {
    var vals = this.vals = this.comp.renderVals();
    var sub = function (tpl) { return tpl.replace(RE, function (_, p) { var v = get(vals, p); return v == null || v === false ? '' : String(v); }); };
    this.ifs.forEach(function (b) {
      var on = !!get(vals, b.path); if (on !== b.last) { b.el.hidden = !on; b.last = on; }
    });
    this.attrs.forEach(function (b) {
      var v;
      if (b.one) { v = get(vals, b.one); if (v === true) v = 'true'; if (v == null || v === false) v = null; }
      else v = sub(b.tpl);
      if (v === b.last) return; b.last = v;
      if (v === null) b.el.removeAttribute(b.name); else b.el.setAttribute(b.name, v);
      if (b.name === 'value' && 'value' in b.el) b.el.value = v == null ? '' : v;
    });
    this.texts.forEach(function (b) { var v = sub(b.tpl); if (v !== b.last) { b.node.nodeValue = v; b.last = v; } });
    if (!this.mounted) { this.mounted = true; if (this.comp.componentDidMount) this.comp.componentDidMount(); }
    else if (this.comp.componentDidUpdate) this.comp.componentDidUpdate();
    if (this.onUpdate) this.onUpdate();
    if (cb) cb();
  };

  function pageFromHash() {
    var h = (location.hash || '').replace(/^#\/?/, '').replace(/\/$/, '').toLowerCase();
    return SLUGS[h] || 'home';
  }

  window.dcBoot = function (Comp, props) {
    var root = document.querySelector('x-dc');
    var comp = new Comp(props || {});
    var theme = null;
    try { theme = localStorage.getItem('theme'); } catch (e) {}
    if (!theme && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark';
    comp.state = { page: pageFromHash() };
    if (theme === 'dark' || theme === 'light') comp.state.theme = theme;
    var rt = new Runtime(root, comp);
    var shown = comp.state.page, savedTheme = comp.state.theme;
    rt.onUpdate = function () {
      var st = comp.state, page = st.page || 'home';
      if (page !== shown) {
        shown = page;
        var h = PAGES[page] ? '#' + PAGES[page] : '';
        if (location.hash !== h && !(h === '' && location.hash === '')) {
          try { history.pushState(null, '', h || location.pathname + location.search); }
          catch (e) { try { location.hash = h; } catch (e2) {} }
        }
        document.title = (page === 'home' ? '' : (PAGES[page][0].toUpperCase() + PAGES[page].slice(1)) + ' · ') + 'Vero Agnolutto, Portfolio';
      }
      if (st.theme && st.theme !== savedTheme) { savedTheme = st.theme; try { localStorage.setItem('theme', st.theme); } catch (e) {} }
    };
    window.addEventListener('popstate', function () {
      var p = pageFromHash(); if (p !== (comp.state.page || 'home')) { shown = p; comp.setState({ page: p, sl: 0 }, function () { window.scrollTo(0, 0); }); }
    });
    rt.update();
    root.style.visibility = 'visible';
    window.__dc = comp;
  };
})();
