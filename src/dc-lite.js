/* dc-lite: a tiny runtime for the portfolio templates.
   Supports {{ path }} bindings in attributes and text, <sc-if value="{{ path }}">, onClick="{{ handler }}",
   a Component class with state/props/renderVals, and hash routing (#journey, #pawspal, ...). */
(function () {
  const RE = /\{\{\s*([\w.]+)\s*\}\}/g;
  const ONE = /^\s*\{\{\s*([\w.]+)\s*\}\}\s*$/;
  const PAGES = { home: '', journey: 'journey', paws: 'pawspal', anna: 'anna', sag: 'sagmill', titanic: 'titanic' };
  const SLUGS = {};
  Object.keys(PAGES).forEach((k) => { SLUGS[PAGES[k]] = k; });

  function get(o, p) {
    let v = o;
    p.split('.').forEach((k) => { v = v == null ? undefined : v[k]; });
    return v;
  }

  function DCLogic(props) { this.props = props || {}; this.state = {}; this.__rt = null; }
  DCLogic.prototype.setState = function (p, cb) {
    const next = typeof p === 'function' ? p(this.state) : p;
    this.state = { ...this.state, ...next };
    if (this.__rt) this.__rt.update(cb);
    else if (cb) cb();
  };
  window.DCLogic = DCLogic;

  function Runtime(root, comp) {
    this.root = root; this.comp = comp; comp.__rt = this;
    this.ifs = []; this.attrs = []; this.texts = []; this.handlers = []; this.mounted = false;
    this.vals = {};
    this.walk(root);
  }

  Runtime.prototype.walkAttributes = function (node) {
    Array.prototype.slice.call(node.attributes).forEach((a) => {
      if (!a.value.includes('{{')) return;
      const m = a.value.match(ONE);
      if (/^on/i.test(a.name) && m) {
        node.removeAttribute(a.name);
        node.addEventListener(a.name.slice(2).toLowerCase(), (e) => {
          const f = get(this.vals, m[1]);
          if (typeof f === 'function') f(e);
        });
      } else {
        this.attrs.push({ el: node, name: a.name, tpl: a.value, one: m ? m[1] : null, last: undefined });
      }
    });
  };

  Runtime.prototype.walk = function (node) {
    if (node.nodeType === 1) {
      if (node.tagName === 'SC-IF') {
        const m = (node.getAttribute('value') || '').match(ONE);
        if (m) this.ifs.push({ el: node, path: m[1], last: undefined });
        node.removeAttribute('value');
        node.removeAttribute('hint-placeholder-val');
      } else {
        this.walkAttributes(node);
      }
      Array.prototype.slice.call(node.childNodes).forEach((c) => { this.walk(c); });
    } else if (node.nodeType === 3 && node.nodeValue.includes('{{')) {
      this.texts.push({ node: node, tpl: node.nodeValue, last: undefined });
    }
  };

  Runtime.prototype.update = function (cb) {
    const vals = this.vals = this.comp.renderVals();
    const sub = (tpl) => tpl.replace(RE, (_, p) => {
      const v = get(vals, p);
      return v == null || v === false ? '' : String(v);
    });
    this.ifs.forEach((b) => {
      const on = !!get(vals, b.path);
      if (on !== b.last) { b.el.hidden = !on; b.last = on; }
    });
    this.attrs.forEach((b) => {
      let v;
      if (b.one) {
        v = get(vals, b.one);
        if (v === true) v = 'true';
        if (v == null || v === false) v = null;
      } else {
        v = sub(b.tpl);
      }
      if (v === b.last) return;
      b.last = v;
      if (v === null) b.el.removeAttribute(b.name);
      else b.el.setAttribute(b.name, v);
      if (b.name === 'value' && 'value' in b.el) b.el.value = v == null ? '' : v;
    });
    this.texts.forEach((b) => {
      const v = sub(b.tpl);
      if (v !== b.last) { b.node.nodeValue = v; b.last = v; }
    });
    if (!this.mounted) {
      this.mounted = true;
      if (this.comp.componentDidMount) this.comp.componentDidMount();
    } else if (this.comp.componentDidUpdate) {
      this.comp.componentDidUpdate();
    }
    if (this.onUpdate) this.onUpdate();
    if (cb) cb();
  };

  function pageFromHash() {
    const h = (location.hash || '').replace(/^#\/?/, '').replace(/\/$/, '').toLowerCase();
    return SLUGS[h] || 'home';
  }

  // Storage and history can throw (private mode, sandboxed frames): the page works without them.
  function tryDo(fn) {
    try { fn(); return true; } catch (error_) { return false; }
  }

  function syncUrl(page) {
    const h = PAGES[page] ? '#' + PAGES[page] : '';
    if (location.hash === h) return;
    const ok = tryDo(() => history.pushState(null, '', h || location.pathname + location.search));
    if (!ok) tryDo(() => { location.hash = h; });
  }

  function pageTitle(page) {
    if (page === 'home') return 'Vero Agnolutto, Portfolio';
    return PAGES[page][0].toUpperCase() + PAGES[page].slice(1) + ' · Vero Agnolutto, Portfolio';
  }

  function savedTheme() {
    let theme = null;
    tryDo(() => { theme = localStorage.getItem('theme'); });
    if (!theme && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark';
    return theme;
  }

  window.dcBoot = function (Comp, props) {
    const root = document.querySelector('x-dc');
    const comp = new Comp(props || {});
    const theme = savedTheme();
    comp.state = { page: pageFromHash() };
    if (theme === 'dark' || theme === 'light') comp.state.theme = theme;
    const rt = new Runtime(root, comp);
    let shown = comp.state.page;
    let storedTheme = comp.state.theme;
    rt.onUpdate = function () {
      const st = comp.state;
      const page = st.page || 'home';
      if (page !== shown) {
        shown = page;
        syncUrl(page);
        document.title = pageTitle(page);
      }
      if (st.theme && st.theme !== storedTheme) {
        storedTheme = st.theme;
        tryDo(() => localStorage.setItem('theme', st.theme));
      }
    };
    window.addEventListener('popstate', function () {
      const p = pageFromHash();
      if (p === (comp.state.page || 'home')) return;
      shown = p;
      comp.setState({ page: p, sl: 0 }, function () { window.scrollTo(0, 0); });
    });
    rt.update();
    root.style.visibility = 'visible';
    window.__dc = comp;
  };
})();
