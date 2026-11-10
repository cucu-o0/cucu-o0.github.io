const TOK = {"light": {"gh0": "#EBEDF0", "gh1": "#9BE9A8", "gh2": "#40C463", "gh3": "#30A14E", "gh4": "#216E39", "bg": "#FFFFFF", "co": "#E1E5DC", "fg": "#14231A", "mu": "#56635A", "ln": "#DADFD0", "cd": "#FFFFFF", "ac": "#1F7A4D", "acf": "#FFFFFF", "tn": "#E0EEDF", "gr": "transparent", "k0": "#1F7A4D", "k1": "#0E7490", "k2": "#B45309", "k3": "#C2410C", "k4": "#6D28D9", "k5": "#475569", "an_ac": "#5E3A72", "an_acf": "#FFFFFF", "an_tn": "#FBFAFE", "ti_ac": "#1B3A5C", "ti_acf": "#FFFFFF", "ti_tn": "#E9EEF4", "sg_ac": "#166234", "sg_acf": "#FFFFFF", "sg_tn": "#E6F2EA", "pw_ac": "#D73C42", "pw_acf": "#FFFFFF", "pw_tn": "#FBEDEE", "an_cd": "#F7F4FD", "gs": "#10151B"}, "dark": {"gh0": "#232B35", "gh1": "#0E4429", "gh2": "#006D32", "gh3": "#26A641", "gh4": "#39D353", "co": "transparent", "bg": "#10151B", "fg": "#E8ECEF", "mu": "#9AA7B2", "ln": "#2B3540", "cd": "#1A222B", "ac": "#5CC49A", "acf": "#0E1A15", "tn": "#1F3A35", "gr": "transparent", "k0": "#5CC49A", "k1": "#5BB6D0", "k2": "#E0A458", "k3": "#E58C73", "k4": "#A99BE0", "k5": "#AAB6C2", "an_ac": "#C9BDF0", "an_acf": "#1B1430", "an_tn": "#2B2445", "ti_ac": "#8FB0D6", "ti_acf": "#0B1624", "ti_tn": "#1C2B3E", "sg_ac": "#6CCB92", "sg_acf": "#07200F", "sg_tn": "#12301E", "pw_ac": "#F08A8E", "pw_acf": "#2A0A0C", "pw_tn": "#3A2326", "an_cd": "#2B2445", "gs": "#10151B"}};
const STG = [{"yr": "2013", "period": "2013 to 2014", "title": "ENGteam & partners", "note": "First job: energy audits and algorithmic evaluations. Method and curiosity from day one.", "v": [3, 3, 3, 3, 3, 2, 3]}, {"yr": "2014", "period": "2014 to 2016", "title": "Windmill Structural Consultants", "note": "Structural analysis under real deadlines: rigour, problem solving, teamwork with architects.", "v": [4, 3, 4, 3, 4, 2, 4]}, {"yr": "2016", "period": "2016 to 2018", "title": "Artec Studio", "note": "Budgets and technical control: commitment to detail and to the client.", "v": [4, 3, 4, 3, 4, 3, 5]}, {"yr": "2018", "period": "2018 to 2020", "title": "BIS Structures", "note": "BIM coordination across disciplines: attention to detail and teamwork.", "v": [4, 4, 4, 4, 4, 3, 5]}, {"yr": "2020", "period": "2020 to 2021", "title": "The pivot", "note": "Bootcamp alongside freelance work. Curiosity and adaptability take over.", "v": [4, 5, 4, 3, 4, 5, 4]}, {"yr": "2021", "period": "2021 to 2022", "title": "Trialing", "note": "Data pipelines in a startup: cross-team coordination.", "v": [4, 5, 4, 4, 4, 5, 4]}, {"yr": "2022", "period": "2022 to 2023", "title": "botshelf.ai", "note": "NLP and vision at startup speed: fast learning, problem solving.", "v": [4, 5, 4, 5, 5, 5, 4]}, {"yr": "2023", "period": "2023 to 2025", "title": "Assist Digital", "note": "GenAI prototypes for clients: ownership of delivery.", "v": [5, 5, 4, 5, 5, 5, 4]}, {"yr": "2025", "period": "2025 to now", "title": "Starlab Barcelona", "note": "A research setting: rigour, autonomy and real-time systems.", "v": [5, 5, 5, 4, 5, 5, 5]}];
const AXN = ["Analytical mind", "Curiosity", "Problem solving", "Teamwork", "Commitment", "Adaptability", "Attention to detail"];
const RC = [280, 232, 150];
const PERM = [0, 2, 6, 1, 5, 3, 4];
const JK = ["star", "assist", "bot", "tri", "bis", "artec", "wind", "eng", "paws"];
const PROJECT_PAGES = ['paws', 'anna', 'sag', 'titanic'];
const HK_PICKS = ['star', 'assist', 'bot', 'tri', 'bis', 'artec', 'wind', 'paws', 'ih'];

// Browser calls that can fail (blocked storage, old browsers): the page still works without them.
function attempt(fn) {
  try {
    fn();
  } catch (error_) {
    /* not critical: the page works without it */
  }
}

function radarPoint(v, k) {
  const a = -Math.PI / 2 + 2 * Math.PI * k / 7;
  const r = RC[2] * v / 5;
  return [RC[0] + r * Math.cos(a), RC[1] + r * Math.sin(a)];
}

function radarPolygon(vals) {
  return PERM.map((o, k) => radarPoint(vals[o], k).map((n) => n.toFixed(1)).join(',')).join(' ');
}

function radarVals(rs, playing) {
  const stg = STG[rs];
  const stp = STG[Math.max(rs - 1, 0)];
  const rad = {
    cur: radarPolygon(stg.v),
    prev: rs === 0 ? '' : radarPolygon(stp.v),
    title: stg.title,
    note: stg.note,
    period: stg.period,
    playLabel: playing ? 'Pause' : 'Play',
  };
  PERM.forEach((o, k) => {
    const p = radarPoint(stg.v[o], k);
    rad['x' + k] = p[0].toFixed(1);
    rad['y' + k] = p[1].toFixed(1);
  });
  rad.pvh = rs !== 4;
  PERM.forEach((o, r) => {
    rad['n' + r] = AXN[o];
    rad['s' + r] = stg.v[o];
    rad['v' + r] = stg.v[o] + '/5';
  });
  return rad;
}

function playToggle(playing, rs) {
  if (playing) return { rplay: false };
  return rs >= 8 ? { rplay: true, rs: 0 } : { rplay: true };
}

class Component extends DCLogic {
  go(p) {
    this.setState({ page: p, sl: 0 }, () => {
      attempt(() => window.scrollTo(0, 0));
      this.anchorJ();
    });
  }

  componentDidMount() {
    this._li = (e) => attempt(() => {
      const el = e.target;
      if (el && el.classList && el.classList.contains('rsl')) this.setState({ rs: +el.value, rplay: false });
    });
    document.addEventListener('input', this._li);
    setTimeout(() => { this.anchorJ(); this.syncSl(); }, 60);
    this._t = setInterval(() => {
      const st = this.state || {};
      if (!st.rplay || st.page !== 'journey') return;
      const nx = (st.rs === undefined ? 8 : st.rs) + 1;
      if (nx >= 9) {
        this.setState({ rplay: false });
        return;
      }
      this.setState({ rs: nx });
    }, 1700);
  }

  componentWillUnmount() {
    attempt(() => {
      clearInterval(this._t);
      document.removeEventListener('input', this._li);
    });
  }

  componentDidUpdate() {
    this.anchorJ();
    this.syncSl();
  }

  syncSl() {
    attempt(() => {
      const rs = (this.state && this.state.rs !== undefined) ? this.state.rs : 8;
      document.querySelectorAll('.rsl').forEach((el) => { if (+el.value !== rs) el.value = rs; });
    });
  }

  anchorJ() {
    attempt(() => {
      const det = document.getElementById('jdet');
      const tl = document.querySelector('.jtlw');
      if (!det || !tl) return;
      if (window.innerWidth < 1100) {
        det.style.marginTop = '';
        return;
      }
      const jk = (this.state && this.state.jk) || 'star';
      const el = tl.querySelector('[data-jk="' + jk + '"]');
      if (!el) return;
      const top = el.getBoundingClientRect().top - tl.getBoundingClientRect().top;
      const maxTop = Math.max(0, tl.offsetHeight - det.offsetHeight);
      det.style.marginTop = Math.max(0, Math.min(top - 8, maxTop)) + 'px';
    });
  }

  pickJ(k) {
    this.setState({ jk: k }, () => {
      this.anchorJ();
      attempt(() => {
        if (window.innerWidth >= 1100) return;
        const el = document.getElementById('jdet');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  scrollToSection(label) {
    attempt(() => {
      const el = document.querySelector('section[aria-label="' + label + '"]');
      if (!el) return;
      const top = el.getBoundingClientRect().top + (window.pageYOffset || 0) - 64;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    });
  }

  goJrnSec() {
    this.setState({ page: 'home', sl: 0 }, () => this.scrollToSection('Journey'));
  }

  goProj() {
    this.setState({ page: 'home', sl: 0 }, () => this.scrollToSection('Projects'));
  }

  renderVals() {
    const s = this.state || {};
    const page = s.page || 'home';
    const theme = s.theme || this.props.theme || 'light';
    const c = TOK[theme] || TOK.light;
    const proj = PROJECT_PAGES.includes(page);
    const homeOn = page === 'home';
    const jOn = page === 'journey';
    const rs = s.rs === undefined ? 8 : s.rs;
    const si = s.sl || 0;
    const nSl = page === 'anna' ? 17 : 26;
    const jk = s.jk || 'star';
    const v = {
      c: c,
      isDark: theme === 'dark',
      isLight: theme !== 'dark',
      themeLabel: theme === 'dark' ? 'Switch to light mode' : 'Switch to night mode',
      toggleTheme: () => this.setState({ theme: theme === 'dark' ? 'light' : 'dark' }),
      isHome: homeOn,
      isJourney: jOn,
      isPaws: page === 'paws',
      isAnna: page === 'anna',
      isSag: page === 'sag',
      isTitanic: page === 'titanic',
      homeLine: homeOn ? c.fg : 'transparent',
      projLine: proj ? c.fg : 'transparent',
      projCur: proj ? 'page' : 'false',
      jLine: jOn ? c.fg : 'transparent',
      homeCur: homeOn ? 'page' : 'false',
      jCur: jOn ? 'page' : 'false',
      goProj: () => this.goProj(),
      goJrn: () => this.goJrnSec(),
      goHome: () => this.go('home'),
      goJourney: () => this.go('journey'),
      goPaws: () => this.go('paws'),
      goAnna: () => this.go('anna'),
      goSag: () => this.go('sag'),
      goTitanic: () => this.go('titanic'),
      rad: radarVals(rs, s.rplay),
      rsv: String(rs),
      rplay: () => this.setState(playToggle(s.rplay, rs)),
      slCount: (si + 1) + ' / ' + nSl,
      slPrev: () => this.setState({ sl: (si + nSl - 1) % nSl }),
      slNext: () => this.setState({ sl: (si + 1) % nSl }),
      hk: s.hk || 'star',
      g: {},
    };
    JK.forEach((k) => {
      v.g['jon_' + k] = jk === k;
      v['jp_' + k] = () => this.pickJ(k);
    });
    HK_PICKS.forEach((k) => { v['hp_' + k] = () => this.setState({ hk: k }); });
    for (let i = 0; i < 26; i++) {
      v['spick' + i] = () => this.setState({ sl: i });
      v['sth' + i] = si === i ? c.ac : c.ln;
      v['dt' + i] = page === 'titanic' && si === i;
      if (i < 17) v['da' + i] = page === 'anna' && si === i;
    }
    return v;
  }
}
