class Component extends DCLogic {
go(p) {
this.setState({ page: p, sl: 0 }, () => {
try { window.scrollTo(0, 0); } catch (e) {}
this.anchorJ();
});
}
componentDidMount() {
this._li = (e) => { try { const el = e.target; if (el && el.classList && el.classList.contains('rsl')) this.setState({ rs: +el.value, rplay: false }); } catch (x) {} };
document.addEventListener('input', this._li);
setTimeout(() => { this.anchorJ(); this.syncSl(); }, 60);
this._t = setInterval(() => {
const st = this.state || {};
if (!st.rplay || st.page !== 'journey') return;
const nx = (st.rs === undefined ? 8 : st.rs) + 1;
if (nx >= 9) { this.setState({ rplay: false }); return; }
this.setState({ rs: nx });
}, 1700);
}
componentWillUnmount() {
try { clearInterval(this._t); document.removeEventListener('input', this._li); } catch (e) {}
}
componentDidUpdate() { this.anchorJ(); this.syncSl(); }
syncSl() {
try { const rs = (this.state && this.state.rs !== undefined) ? this.state.rs : 8; document.querySelectorAll('.rsl').forEach((el) => { if (+el.value !== rs) el.value = rs; }); } catch (e) {}
}
anchorJ() {
try {
const det = document.getElementById('jdet'); const tl = document.querySelector('.jtlw');
if (!det || !tl) return;
if (window.innerWidth < 1100) { det.style.marginTop = ''; return; }
const jk = (this.state && this.state.jk) || 'star';
const el = tl.querySelector('[data-jk="' + jk + '"]');
if (!el) return;
const top = el.getBoundingClientRect().top - tl.getBoundingClientRect().top;
const maxTop = Math.max(0, tl.offsetHeight - det.offsetHeight);
det.style.marginTop = Math.max(0, Math.min(top - 8, maxTop)) + 'px';
} catch (e) {}
}
pickJ(k) {
this.setState({ jk: k }, () => {
this.anchorJ();
try { if (window.innerWidth < 1100) { const el = document.getElementById('jdet'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } } catch (e) {}
});
}
jumpTo(sel) {
try { const box = document.getElementById('tlscroll'); const el = box && box.querySelector(sel); if (!el) return; const top = el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop - 8; box.scrollTo({ top: Math.max(0, top), behavior: 'smooth' }); } catch (e) {}
}
goJrnSec() {
this.setState({ page: 'home', sl: 0 }, () => {
try { const el = document.querySelector('section[aria-label="Journey"]'); if (el) window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + (window.pageYOffset || 0) - 64), behavior: 'smooth' }); } catch (e) {}
});
}
goProj() {
this.setState({ page: 'home', sl: 0 }, () => {
try { const el = document.querySelector('section[aria-label="Projects"]'); if (el) window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + (window.pageYOffset || 0) - 64), behavior: 'smooth' }); } catch (e) {}
});
}
jumpData() { this.jumpTo('.gzb .gh'); }
jumpPivot() { this.jumpTo('#pivot'); }
jumpBuild() { this.jumpTo('.gza .gh'); }
renderVals() {
const s = this.state || {};
const page = s.page || 'home';
const theme = s.theme || this.props.theme || 'light';
const TOK = {"light": {"gh0": "#EBEDF0", "gh1": "#9BE9A8", "gh2": "#40C463", "gh3": "#30A14E", "gh4": "#216E39", "bg": "#FFFFFF", "co": "#E1E5DC", "fg": "#14231A", "mu": "#56635A", "ln": "#DADFD0", "cd": "#FFFFFF", "ac": "#1F7A4D", "acf": "#FFFFFF", "tn": "#E0EEDF", "gr": "transparent", "k0": "#1F7A4D", "k1": "#0E7490", "k2": "#B45309", "k3": "#C2410C", "k4": "#6D28D9", "k5": "#475569", "an_ac": "#5E3A72", "an_acf": "#FFFFFF", "an_tn": "#FBFAFE", "ti_ac": "#1B3A5C", "ti_acf": "#FFFFFF", "ti_tn": "#E9EEF4", "sg_ac": "#166234", "sg_acf": "#FFFFFF", "sg_tn": "#E6F2EA", "pw_ac": "#D73C42", "pw_acf": "#FFFFFF", "pw_tn": "#FBEDEE", "an_cd": "#F7F4FD"}, "dark": {"gh0": "#232B35", "gh1": "#0E4429", "gh2": "#006D32", "gh3": "#26A641", "gh4": "#39D353", "co": "transparent", "bg": "#10151B", "fg": "#E8ECEF", "mu": "#9AA7B2", "ln": "#2B3540", "cd": "#1A222B", "ac": "#5CC49A", "acf": "#0E1A15", "tn": "#1F3A35", "gr": "transparent", "k0": "#5CC49A", "k1": "#5BB6D0", "k2": "#E0A458", "k3": "#E58C73", "k4": "#A99BE0", "k5": "#AAB6C2", "an_ac": "#C9BDF0", "an_acf": "#1B1430", "an_tn": "#2B2445", "ti_ac": "#8FB0D6", "ti_acf": "#0B1624", "ti_tn": "#1C2B3E", "sg_ac": "#6CCB92", "sg_acf": "#07200F", "sg_tn": "#12301E", "pw_ac": "#F08A8E", "pw_acf": "#2A0A0C", "pw_tn": "#3A2326", "an_cd": "#2B2445"}};
const c = TOK[theme] || TOK.light;
const proj = ['paws', 'anna', 'sag', 'titanic'].indexOf(page) >= 0;
const homeOn = page === 'home';
const jOn = page === 'journey';
const AXN = ["Analytical mind", "Curiosity", "Problem solving", "Teamwork", "Commitment", "Adaptability", "Attention to detail"];
const STG = [{"yr": "2013", "period": "2013 to 2014", "title": "ENGteam & partners", "note": "First job: energy audits and algorithmic evaluations. Method and curiosity from day one.", "v": [3, 3, 3, 3, 3, 2, 3]}, {"yr": "2014", "period": "2014 to 2016", "title": "Windmill Structural Consultants", "note": "Structural analysis under real deadlines: rigour, problem solving, teamwork with architects.", "v": [4, 3, 4, 3, 4, 2, 4]}, {"yr": "2016", "period": "2016 to 2018", "title": "Artec Studio", "note": "Budgets and technical control: commitment to detail and to the client.", "v": [4, 3, 4, 3, 4, 3, 5]}, {"yr": "2018", "period": "2018 to 2020", "title": "BIS Structures", "note": "BIM coordination across disciplines: attention to detail and teamwork.", "v": [4, 4, 4, 4, 4, 3, 5]}, {"yr": "2020", "period": "2020 to 2021", "title": "The pivot", "note": "Bootcamp alongside freelance work. Curiosity and adaptability take over.", "v": [4, 5, 4, 3, 4, 5, 4]}, {"yr": "2021", "period": "2021 to 2022", "title": "Trialing", "note": "Data pipelines in a startup: cross-team coordination.", "v": [4, 5, 4, 4, 4, 5, 4]}, {"yr": "2022", "period": "2022 to 2023", "title": "botshelf.ai", "note": "NLP and vision at startup speed: fast learning, problem solving.", "v": [4, 5, 4, 5, 5, 5, 4]}, {"yr": "2023", "period": "2023 to 2025", "title": "Assist Digital", "note": "GenAI prototypes for clients: ownership of delivery.", "v": [5, 5, 4, 5, 5, 5, 4]}, {"yr": "2025", "period": "2025 to now", "title": "Starlab Barcelona", "note": "A research setting: rigour, autonomy and real-time systems.", "v": [5, 5, 5, 4, 5, 5, 5]}];
const EXP = [{"when": "Jun 2025 to now", "title": "Starlab Barcelona", "role": "Research \u00b7 AI Engineer", "org": "DeepTech neuroscience R&D, Barcelona", "bl": ["ML models for EEG-based analysis in applied neuroscience.", "Real-time EEG reporting system: 2-minute turnaround, replacing a daily automation.", "Maintain an XNAT research database for EEG and neuroscience data."], "side": "r"}, {"when": "Ongoing", "title": "Claude Certified Architect, Foundations", "role": "Anthropic, online", "org": "", "bl": ["Preparing for the exam alongside PawsPal."], "side": "l"}, {"when": "Jun 2023 to Jun 2025", "title": "Assist Digital", "role": "Data / AI Engineer", "org": "Digital CRM and CX solutions, Rome", "bl": ["AI applications with generative AI and few-shot learning.", "AI prototypes and demos for client presentations.", "Shipped classification pipelines and OCR models to production."], "side": "r", "url": "https://assistdigital.com/services/advanced-ai-solutions"}, {"when": "Feb to Mar 2025", "title": "AI for Medicine", "role": "DeepLearning.AI, online", "org": "", "bl": [], "side": "l"}, {"when": "Nov 2024 to Mar 2025", "title": "Azure AI-900 and AZ-900", "role": "Microsoft, online", "org": "", "bl": [], "side": "l"}, {"when": "Nov 2022 to Jun 2023", "title": "botshelf.ai", "role": "NLP \u00b7 Computer Vision", "org": "RPA startup, Rome", "bl": ["NLP for text classification and document analysis.", "Computer vision for OCR and handwritten text recognition."], "side": "r", "url": "https://assistdigital.com/tech/botshelf"}, {"when": "Jun 2021 to Nov 2022", "title": "Trialing", "role": "Data Scientist", "org": "Healthcare startup, Barcelona", "bl": ["Built core databases from scratch to ingest web-scraped and structured data into scalable pipelines.", "Optimized pipelines for data quality.", "Improved cross-team coordination."], "side": "r", "url": "https://trialing.org/"}, {"when": "Sep 2022", "title": "Machine Learning Specialization", "role": "Andrew Ng, Coursera", "org": "", "bl": [], "side": "l"}, {"when": "Dec 2020 to Jun 2021", "title": "Freelance ML projects", "role": "Barcelona", "org": "", "bl": ["ANNa: leukemia detection with computer vision.", "SAG Mill: time series forecasting with LSTM.", "Titanic: Kaggle machine learning challenge."], "side": "r"}, {"when": "Dec 2020 to Jun 2021", "title": "IronHack", "role": "Part-time bootcamp, data analytics and ML", "org": "Barcelona", "bl": [], "side": "l"}, {"when": "Oct 2018 to Mar 2020", "title": "BIS Structures", "role": "Structural engineer", "org": "Structural consultants, Barcelona", "bl": ["BIM modeling and coordination with Revit.", "Process automation workflows with Dynamo."], "side": "r"}, {"when": "Nov 2016 to Apr 2018", "title": "Artec Studio", "role": "Lighting design studio, Barcelona", "org": "", "bl": ["Excel sheets for budgets and technical control.", "Futur Camp Nou Stadium, with Nikken Sekkei and b720 Ferm\u00edn V\u00e1zquez Architects."], "side": "r", "url": "http://www.artec3.com"}, {"when": "May 2014 to Mar 2016", "title": "Windmill Structural Consultants", "role": "Structural engineer", "org": "Tarragona", "bl": ["Concrete and steel structural analysis, including seismic loads.", "New Camp Nou Stadium competition, and the sculpture Mine!, No Mine! by Lorenzo Quinn."], "side": "r"}, {"when": "2015", "title": "Polytechnic University of Catalonia", "role": "Postgraduate courses, Barcelona", "org": "", "bl": ["Structural analysis, dynamics and seismic analysis. Steel and concrete structures, soil mechanics."], "side": "l"}, {"when": "Sep 2013 to Apr 2014", "title": "ENGteam & partners", "role": "Energy service company, Pordenone", "org": "", "bl": ["Excel procedure for energy audits.", "Algorithmic evaluation of lighting system efficiency."], "side": "r"}, {"when": "2012", "title": "University of Florence", "role": "Master's, bioecological architecture and technology", "org": "", "bl": [], "side": "l"}, {"when": "2011", "title": "University of Trento", "role": "Master's, architectural engineering", "org": "", "bl": [], "side": "l"}, {"when": "2026", "title": "PawsPal", "role": "Side project", "org": "AI pet-adoption matcher for a Barcelona shelter", "bl": ["Adopters take a quiz and swipe through matched pets.", "An LLM extracts, deterministic code ranks.", "Python, FastAPI, Supabase, React PWA, Groq, pytest."], "side": "l", "url": "https://pawspal-portfolio.onrender.com", "urlLabel": "Live demo"}];
const rs = s.rs === undefined ? 8 : s.rs;
const stg = STG[rs];
const stp = STG[Math.max(rs - 1, 0)];
const RC = [280, 232, 150];
const rpt = (v, k) => { const a = -Math.PI / 2 + 2 * Math.PI * k / 7; const r = RC[2] * v / 5; return [RC[0] + r * Math.cos(a), RC[1] + r * Math.sin(a)]; };
const PERM = [0, 2, 6, 1, 5, 3, 4];
const rpoly = (vals) => PERM.map((o, k) => rpt(vals[o], k).map((n) => n.toFixed(1)).join(',')).join(' ');
const rad = { cur: rpoly(stg.v), prev: rs === 0 ? '' : rpoly(stp.v), title: stg.title, note: stg.note, period: stg.period, playLabel: s.rplay ? 'Pause' : 'Play' };
PERM.forEach((o, k) => { const p = rpt(stg.v[o], k); rad['x' + k] = p[0].toFixed(1); rad['y' + k] = p[1].toFixed(1); });
rad.pvh = rs !== 4;
PERM.forEach((o, r) => { rad['n' + r] = AXN[o]; rad['s' + r] = stg.v[o]; rad['v' + r] = stg.v[o] + '/5'; });
const si = s.sl || 0;
const nSl = page === 'anna' ? 17 : 26;
const sel0 = s.sel || 0;
const ex = EXP[sel0];
const sel = { title: ex.title, role: ex.role, org: ex.org, hasOrg: !!ex.org, hasUrl: !!ex.url, url: ex.url || '', urlLabel: ex.urlLabel || 'Visit website', label: sel0 === 0 ? 'Latest role · ' + ex.when : ex.when, isFirst: sel0 === 0 };
for (let j = 0; j < 4; j++) { sel['h' + j] = j < ex.bl.length; sel['b' + j] = ex.bl[j] || ''; }
const GD = {"P": [{"n": "Starlab Barcelona", "s": "Starlab", "k": "Job", "d": 1, "w": "2025 to now", "x": "Machine learning on EEG data and a real-time reporting system for neuroscience research."}, {"n": "PawsPal", "s": "PawsPal", "k": "Project", "d": 1, "w": "ongoing", "x": "A pet-adoption matcher: an AI reads shelter posts, plain code ranks the pets."}, {"n": "Assist Digital", "s": "Assist Digital", "k": "Job", "d": 1, "w": "2023 to 2025", "x": "Generative AI prototypes for clients and pipelines shipped to production."}, {"n": "botshelf.ai", "s": "botshelf.ai", "k": "Job", "d": 1, "w": "2022 to 2023", "x": "Text classification, document analysis and handwriting recognition."}, {"n": "Trialing", "s": "Trialing", "k": "Job", "d": 1, "w": "2021 to 2022", "x": "Databases and data pipelines for a healthcare startup."}, {"n": "Titanic", "s": "Titanic", "k": "Project", "d": 1, "w": "2021", "x": "Kaggle challenge: predict who survived the Titanic."}, {"n": "SAG Mill", "s": "SAG Mill", "k": "Project", "d": 1, "w": "2021", "x": "Forecasting mill measurements five minutes ahead."}, {"n": "ANNa", "s": "ANNa", "k": "Project", "d": 1, "w": "2020 to 2021", "x": "Computer vision to spot leukemia cells in blood images."}, {"n": "BIS Structures", "s": "BIS", "k": "Job", "d": 0, "w": "2018 to 2020", "x": "3D building models, coordinated with other disciplines."}, {"n": "Artec Studio", "s": "Artec", "k": "Job", "d": 0, "w": "2016 to 2018", "x": "Budgets and technical control for a lighting design studio."}, {"n": "Windmill Structural", "s": "Windmill", "k": "Job", "d": 0, "w": "2014 to 2016", "x": "Structural analysis of concrete and steel, including earthquakes."}, {"n": "ENGteam & partners", "s": "ENGteam", "k": "Job", "d": 0, "w": "2013 to 2014", "x": "Energy audits and a method to score lighting efficiency."}], "U": [{"n": "Prediction and classification", "s": "Prediction", "d": 1, "x": "Teaching a model to predict or sort things from examples."}, {"n": "Images and documents", "s": "Images & docs", "d": 1, "x": "Getting information out of pictures, scans and handwriting."}, {"n": "Language and GenAI", "s": "Language & GenAI", "d": 1, "x": "Software that reads and writes text, powered by language models."}, {"n": "Monitoring and forecasting", "s": "Forecasting", "d": 1, "x": "Watching a process and predicting what happens next."}, {"n": "Pipelines and data quality", "s": "Pipelines", "d": 1, "x": "Moving data from A to B and keeping it clean and reliable."}, {"n": "Automation", "s": "Automation", "d": 2, "x": "Replacing repeated manual work with code. Same idea on buildings and on data."}, {"n": "Evaluation", "s": "Evaluation", "d": 2, "x": "Measuring how good a model, a design or a system really is."}, {"n": "Engineering analysis and design", "s": "Engineering", "d": 0, "x": "Calculating and modeling structures and buildings."}], "T": [{"n": "Python", "x": "Programming language for data and AI."}, {"n": "PyTorch", "x": "Library to build and train neural networks."}, {"n": "TensorFlow", "x": "Google's library for neural networks."}, {"n": "scikit-learn", "x": "Classic machine learning toolkit."}, {"n": "pandas", "x": "Tables and data analysis in Python."}, {"n": "numpy", "x": "Fast numerical computing in Python."}, {"n": "spaCy", "x": "Library to process text."}, {"n": "OpenCV", "x": "Library to process images."}, {"n": "YOLO", "x": "Fast object detection in images."}, {"n": "Computer Vision", "x": "Teaching computers to understand images."}, {"n": "OCR", "x": "Turns scans and handwriting into digital text."}, {"n": "LangChain", "x": "Framework to build apps around language models."}, {"n": "RAG", "x": "Gives a language model the right documents before it answers."}, {"n": "OpenAI", "x": "Language model API (GPT)."}, {"n": "Claude", "x": "Anthropic's language model."}, {"n": "Claude Code", "x": "AI coding assistant."}, {"n": "Docker", "x": "Packages software so it runs anywhere."}, {"n": "FastAPI", "x": "Python framework for web APIs."}, {"n": "PostgreSQL", "x": "Relational database."}, {"n": "Pinecone", "x": "Database for search by meaning."}, {"n": "Git", "x": "Version control for code."}, {"n": "Unit tests", "x": "Automatic checks that code still works."}, {"n": "AWS", "x": "Amazon's cloud platform."}, {"n": "Azure", "x": "Microsoft's cloud platform."}, {"n": "Streamlit", "x": "Quick web apps for data demos."}, {"n": "Jira", "x": "Team task tracking."}, {"n": "Groq", "x": "Fast platform to run language models."}, {"n": "Revit", "x": "3D building modeling (BIM) software."}, {"n": "Dynamo", "x": "Visual scripting to automate Revit."}, {"n": "Rhinoceros", "x": "3D modeling software."}, {"n": "Excel", "x": "Spreadsheets for calculations and reports."}, {"n": "Structural analysis software", "x": "Calculation of concrete and steel structures."}], "TR": [[0, 0, [0, 1, 5, 4]], [0, 5, [0, 20]], [0, 4, [0, 4]], [1, 2, [0, 26, 14, 15]], [1, 4, [0, 17, 18]], [1, 6, [0, 21]], [1, 5, [20, 21]], [2, 2, [0, 13, 11, 12, 19, 24]], [2, 1, [0, 10, 7]], [2, 4, [0, 16, 22, 23]], [3, 2, [0, 6]], [3, 1, [0, 9, 10, 7, 8]], [4, 4, [0, 4, 18, 20, 25]], [5, 0, [0, 3, 4, 5]], [5, 6, [3, 4]], [6, 3, [0, 2, 4, 5]], [6, 6, [2, 4]], [7, 1, [0, 2, 7, 9]], [7, 0, [2, 5]], [7, 6, [0, 5]], [8, 7, [27]], [8, 5, [28, 27]], [9, 7, [29]], [9, 5, [30]], [10, 7, [31]], [11, 5, [30]], [11, 6, [30]]], "EU": [[0, 0], [0, 1], [0, 5], [0, 4], [5, 0], [5, 20], [4, 0], [4, 4], [2, 0], [2, 26], [2, 14], [2, 15], [4, 17], [4, 18], [6, 0], [6, 21], [5, 21], [2, 13], [2, 11], [2, 12], [2, 19], [2, 24], [1, 0], [1, 10], [1, 7], [4, 16], [4, 22], [4, 23], [2, 6], [1, 9], [1, 8], [4, 20], [4, 25], [0, 3], [6, 3], [6, 4], [3, 0], [3, 2], [3, 4], [3, 5], [6, 2], [1, 2], [0, 2], [6, 5], [7, 27], [5, 28], [5, 27], [7, 29], [5, 30], [7, 31], [6, 30]], "ET": [[0, 0], [1, 0], [5, 0], [4, 0], [20, 0], [0, 1], [26, 1], [14, 1], [15, 1], [17, 1], [18, 1], [21, 1], [20, 1], [0, 2], [13, 2], [11, 2], [12, 2], [19, 2], [24, 2], [10, 2], [7, 2], [16, 2], [22, 2], [23, 2], [0, 3], [6, 3], [9, 3], [10, 3], [7, 3], [8, 3], [0, 4], [4, 4], [18, 4], [20, 4], [25, 4], [0, 5], [3, 5], [4, 5], [5, 5], [0, 6], [2, 6], [4, 6], [5, 6], [0, 7], [2, 7], [7, 7], [9, 7], [5, 7], [27, 8], [28, 8], [29, 9], [30, 9], [31, 10], [30, 11]], "DEF": 5};
const gk = s.gk || 'n';
const gi = s.gi === undefined ? GD.DEF : s.gi;
const act = gk === 'n' ? [] : GD.TR.filter((x) => gk === 'u' ? x[1] === gi : gk === 'p' ? x[0] === gi : x[2].indexOf(gi) >= 0);
const gsp = {}, gsu = {}, gst = {}, geu = {}, get = {};
act.forEach((x) => { gsp[x[0]] = 1; gsu[x[1]] = 1; x[2].forEach((t) => { gst[t] = 1; geu[x[1] + ',' + t] = 1; get[t + ',' + x[0]] = 1; }); });
const GDC = ['var(--k2)', 'var(--k1)', 'var(--k0)'];
const g = {};
const ovs = s.ov || 0;
[0, 1, 2].forEach((i) => { g['ov' + i] = ovs === i; g['ovb' + i] = ovs === i ? c.ac : c.tn; g['ovf' + i] = ovs === i ? c.acf : c.fg; g['ovp' + i] = ovs === i ? 'true' : 'false'; });
const gset = { u: gsu, p: gsp, t: gst };
const garr = { u: GD.U, p: GD.P, t: GD.T };
['u', 'p', 't'].forEach((k) => {
  garr[k].forEach((nd, i) => {
    const on = gk === 'n' ? true : !!gset[k][i];
    const sel = gk === k && gi === i;
    const base = k === 'u' ? [GDC[nd.d], 'var(--bg)', GDC[nd.d]] : k === 'p' ? ['var(--cd)', 'var(--fg)', GDC[nd.d]] : ['var(--tn)', 'var(--fg)', 'var(--ln)'];
    g['nbg_' + k + i] = sel ? 'var(--fg)' : base[0];
    g['nfg_' + k + i] = sel ? 'var(--bg)' : base[1];
    g['nbd_' + k + i] = sel ? 'var(--fg)' : base[2];
    g['no_' + k + i] = on ? '1' : '.22';
    g['pr_' + k + i] = sel ? 'true' : 'false';
    g['cv_' + k + i] = (on && !sel && gk !== k) ? 'inline-flex' : 'none';
  });
  g['hv_' + k] = gk !== k;
});
GD.EU.forEach((e, n) => { g['eo' + n] = gk === 'n' ? '.22' : (geu[e[0] + ',' + e[1]] ? '.9' : '.06'); });
GD.ET.forEach((e, n) => { g['eo' + (GD.EU.length + n)] = gk === 'n' ? '.22' : (get[e[0] + ',' + e[1]] ? '.9' : '.06'); });
const gtl = (x) => x[2].length ? x[2].map((t) => GD.T[t].n).join(', ') : 'No tools listed.';
let grows = [];
if (gk === 'u') { g.kind = 'Task'; g.title = GD.U[gi].n; g.desc = GD.U[gi].x; g.rowsLabel = 'Where, and with which tools'; grows = act.map((x) => [GD.P[x[0]].n + ' · ' + GD.P[x[0]].w, gtl(x)]); }
else if (gk === 'p') { const p = GD.P[gi]; g.kind = p.k + ' · ' + p.w; g.title = p.n; g.desc = p.x; g.rowsLabel = 'What I did there, and with which tools'; grows = act.map((x) => [GD.U[x[1]].n, gtl(x)]); }
else { g.kind = 'Tool'; g.title = GD.T[gi].n; g.desc = GD.T[gi].x; g.rowsLabel = 'Where I used it, and for what'; const byP = {}; act.forEach((x) => { (byP[x[0]] = byP[x[0]] || []).push(GD.U[x[1]].n); }); grows = Object.keys(byP).map((p) => [GD.P[p].n + ' · ' + GD.P[p].w, byP[p].join(', ')]); }
g.hasRows = grows.length > 0;
for (let r = 0; r < 12; r++) { g['rv' + r] = r < grows.length; g['rt' + r] = r < grows.length ? grows[r][0] : ''; g['rx' + r] = r < grows.length ? grows[r][1] : ''; }
const JK = ["star", "assist", "bot", "tri", "bis", "artec", "wind", "eng", "paws"];
const jk = s.jk || 'star';
g.jopen = jk ? 'block' : 'none';
JK.forEach((k) => { g['jon_' + k] = jk === k; });
return {
c: c,
isDark: theme === 'dark',
isLight: theme !== 'dark',
themeLabel: theme === 'dark' ? 'Switch to light mode' : 'Switch to night mode',
toggleTheme: () => this.setState({ theme: theme === 'dark' ? 'light' : 'dark' }),
isHome: page === 'home',
isJourney: jOn,
isPaws: page === 'paws',
isAnna: page === 'anna',
isSag: page === 'sag',
isTitanic: page === 'titanic',
homeLine: homeOn ? c.fg : 'transparent', projLine: proj ? c.fg : 'transparent', projCur: proj ? 'page' : 'false', goProj: () => this.goProj(), goJrn: () => this.goJrnSec(),
jLine: jOn ? c.fg : 'transparent',
homeBg: homeOn ? c.tn : 'transparent',
jBg: jOn ? c.tn : 'transparent',
homeCur: homeOn ? 'page' : 'false',
pwBg: page === 'paws' ? c.tn : 'transparent',
pwCur: page === 'paws' ? 'page' : 'false',
jCur: jOn ? 'page' : 'false',
goHome: () => this.go('home'),
goJourney: () => this.go('journey'),
goPaws: () => this.go('paws'),
goAnna: () => this.go('anna'),
goSag: () => this.go('sag'),
goTitanic: () => this.go('titanic'),
showFull: !!s.full,
fullLabel: s.full ? 'Hide full timeline ↑' : 'Show full timeline ↓',
toggleFull: () => this.setState({ full: !s.full }),
rad: rad, rsv: String(rs), sel: sel,
rplay: () => this.setState(s.rplay ? { rplay: false } : (rs >= 8 ? { rplay: true, rs: 0 } : { rplay: true })),
jumpPivot: () => this.jumpPivot(), jumpData: () => this.jumpData(), jumpBuild: () => this.jumpBuild(),
slCount: (si + 1) + ' / ' + nSl,
slPrev: () => this.setState({ sl: (si + nSl - 1) % nSl }),
slNext: () => this.setState({ sl: (si + 1) % nSl }),
g: g,
jclose: () => this.setState({ jk: '' }),
hk: (s.hk || 'star'), hp_star: () => this.setState({ hk: 'star' }), hp_assist: () => this.setState({ hk: 'assist' }), hp_bot: () => this.setState({ hk: 'bot' }), hp_tri: () => this.setState({ hk: 'tri' }), hp_bis: () => this.setState({ hk: 'bis' }), hp_artec: () => this.setState({ hk: 'artec' }), hp_wind: () => this.setState({ hk: 'wind' }), hp_paws: () => this.setState({ hk: 'paws' }), hp_ih: () => this.setState({ hk: 'ih' }), jp_star: () => this.pickJ('star'),
jp_paws: () => this.pickJ('paws'),
jp_assist: () => this.pickJ('assist'),
jp_bot: () => this.pickJ('bot'),
jp_tri: () => this.pickJ('tri'),
jp_mlp: () => this.pickJ('mlp'),
jp_bis: () => this.pickJ('bis'),
jp_artec: () => this.pickJ('artec'),
jp_wind: () => this.pickJ('wind'),
jp_eng: () => this.pickJ('eng'),
gclr: () => this.setState({ gk: 'n' }),
gov0: () => this.setState({ ov: 0 }),
gov1: () => this.setState({ ov: 1 }),
gov2: () => this.setState({ ov: 2 }),
gpu0: () => this.setState({ gk: 'u', gi: 0 }),
gpu1: () => this.setState({ gk: 'u', gi: 1 }),
gpu2: () => this.setState({ gk: 'u', gi: 2 }),
gpu3: () => this.setState({ gk: 'u', gi: 3 }),
gpu4: () => this.setState({ gk: 'u', gi: 4 }),
gpu5: () => this.setState({ gk: 'u', gi: 5 }),
gpu6: () => this.setState({ gk: 'u', gi: 6 }),
gpu7: () => this.setState({ gk: 'u', gi: 7 }),
gpp0: () => this.setState({ gk: 'p', gi: 0 }),
gpp1: () => this.setState({ gk: 'p', gi: 1 }),
gpp2: () => this.setState({ gk: 'p', gi: 2 }),
gpp3: () => this.setState({ gk: 'p', gi: 3 }),
gpp4: () => this.setState({ gk: 'p', gi: 4 }),
gpp5: () => this.setState({ gk: 'p', gi: 5 }),
gpp6: () => this.setState({ gk: 'p', gi: 6 }),
gpp7: () => this.setState({ gk: 'p', gi: 7 }),
gpp8: () => this.setState({ gk: 'p', gi: 8 }),
gpp9: () => this.setState({ gk: 'p', gi: 9 }),
gpp10: () => this.setState({ gk: 'p', gi: 10 }),
gpp11: () => this.setState({ gk: 'p', gi: 11 }),
gpt0: () => this.setState({ gk: 't', gi: 0 }),
gpt1: () => this.setState({ gk: 't', gi: 1 }),
gpt2: () => this.setState({ gk: 't', gi: 2 }),
gpt3: () => this.setState({ gk: 't', gi: 3 }),
gpt4: () => this.setState({ gk: 't', gi: 4 }),
gpt5: () => this.setState({ gk: 't', gi: 5 }),
gpt6: () => this.setState({ gk: 't', gi: 6 }),
gpt7: () => this.setState({ gk: 't', gi: 7 }),
gpt8: () => this.setState({ gk: 't', gi: 8 }),
gpt9: () => this.setState({ gk: 't', gi: 9 }),
gpt10: () => this.setState({ gk: 't', gi: 10 }),
gpt11: () => this.setState({ gk: 't', gi: 11 }),
gpt12: () => this.setState({ gk: 't', gi: 12 }),
gpt13: () => this.setState({ gk: 't', gi: 13 }),
gpt14: () => this.setState({ gk: 't', gi: 14 }),
gpt15: () => this.setState({ gk: 't', gi: 15 }),
gpt16: () => this.setState({ gk: 't', gi: 16 }),
gpt17: () => this.setState({ gk: 't', gi: 17 }),
gpt18: () => this.setState({ gk: 't', gi: 18 }),
gpt19: () => this.setState({ gk: 't', gi: 19 }),
gpt20: () => this.setState({ gk: 't', gi: 20 }),
gpt21: () => this.setState({ gk: 't', gi: 21 }),
gpt22: () => this.setState({ gk: 't', gi: 22 }),
gpt23: () => this.setState({ gk: 't', gi: 23 }),
gpt24: () => this.setState({ gk: 't', gi: 24 }),
gpt25: () => this.setState({ gk: 't', gi: 25 }),
gpt26: () => this.setState({ gk: 't', gi: 26 }),
gpt27: () => this.setState({ gk: 't', gi: 27 }),
gpt28: () => this.setState({ gk: 't', gi: 28 }),
gpt29: () => this.setState({ gk: 't', gi: 29 }),
gpt30: () => this.setState({ gk: 't', gi: 30 }),
gpt31: () => this.setState({ gk: 't', gi: 31 }),
rpick0: () => this.setState({ rs: 0, rplay: false }),
rpbg0: rs === 0 ? c.ac : c.tn,
rpfg0: rs === 0 ? c.acf : c.fg,
rpress0: rs === 0 ? 'true' : 'false',
rpick1: () => this.setState({ rs: 1, rplay: false }),
rpbg1: rs === 1 ? c.ac : c.tn,
rpfg1: rs === 1 ? c.acf : c.fg,
rpress1: rs === 1 ? 'true' : 'false',
rpick2: () => this.setState({ rs: 2, rplay: false }),
rpbg2: rs === 2 ? c.ac : c.tn,
rpfg2: rs === 2 ? c.acf : c.fg,
rpress2: rs === 2 ? 'true' : 'false',
rpick3: () => this.setState({ rs: 3, rplay: false }),
rpbg3: rs === 3 ? c.ac : c.tn,
rpfg3: rs === 3 ? c.acf : c.fg,
rpress3: rs === 3 ? 'true' : 'false',
rpick4: () => this.setState({ rs: 4, rplay: false }),
rpbg4: rs === 4 ? c.ac : c.tn,
rpfg4: rs === 4 ? c.acf : c.fg,
rpress4: rs === 4 ? 'true' : 'false',
rpick5: () => this.setState({ rs: 5, rplay: false }),
rpbg5: rs === 5 ? c.ac : c.tn,
rpfg5: rs === 5 ? c.acf : c.fg,
rpress5: rs === 5 ? 'true' : 'false',
rpick6: () => this.setState({ rs: 6, rplay: false }),
rpbg6: rs === 6 ? c.ac : c.tn,
rpfg6: rs === 6 ? c.acf : c.fg,
rpress6: rs === 6 ? 'true' : 'false',
rpick7: () => this.setState({ rs: 7, rplay: false }),
rpbg7: rs === 7 ? c.ac : c.tn,
rpfg7: rs === 7 ? c.acf : c.fg,
rpress7: rs === 7 ? 'true' : 'false',
rpick8: () => this.setState({ rs: 8, rplay: false }),
rpbg8: rs === 8 ? c.ac : c.tn,
rpfg8: rs === 8 ? c.acf : c.fg,
rpress8: rs === 8 ? 'true' : 'false',
pickE0: () => this.setState({ sel: 0 }),
ebg0: sel0 === 0 ? c.tn : 'transparent',
epress0: sel0 === 0 ? 'true' : 'false',
pickE1: () => this.setState({ sel: 1 }),
ebg1: sel0 === 1 ? c.tn : 'transparent',
epress1: sel0 === 1 ? 'true' : 'false',
pickE2: () => this.setState({ sel: 2 }),
ebg2: sel0 === 2 ? c.tn : 'transparent',
epress2: sel0 === 2 ? 'true' : 'false',
pickE3: () => this.setState({ sel: 3 }),
ebg3: sel0 === 3 ? c.tn : 'transparent',
epress3: sel0 === 3 ? 'true' : 'false',
pickE4: () => this.setState({ sel: 4 }),
ebg4: sel0 === 4 ? c.tn : 'transparent',
epress4: sel0 === 4 ? 'true' : 'false',
pickE5: () => this.setState({ sel: 5 }),
ebg5: sel0 === 5 ? c.tn : 'transparent',
epress5: sel0 === 5 ? 'true' : 'false',
pickE6: () => this.setState({ sel: 6 }),
ebg6: sel0 === 6 ? c.tn : 'transparent',
epress6: sel0 === 6 ? 'true' : 'false',
pickE7: () => this.setState({ sel: 7 }),
ebg7: sel0 === 7 ? c.tn : 'transparent',
epress7: sel0 === 7 ? 'true' : 'false',
pickE8: () => this.setState({ sel: 8 }),
ebg8: sel0 === 8 ? c.tn : 'transparent',
epress8: sel0 === 8 ? 'true' : 'false',
pickE9: () => this.setState({ sel: 9 }),
ebg9: sel0 === 9 ? c.tn : 'transparent',
epress9: sel0 === 9 ? 'true' : 'false',
pickE10: () => this.setState({ sel: 10 }),
ebg10: sel0 === 10 ? c.tn : 'transparent',
epress10: sel0 === 10 ? 'true' : 'false',
pickE11: () => this.setState({ sel: 11 }),
ebg11: sel0 === 11 ? c.tn : 'transparent',
epress11: sel0 === 11 ? 'true' : 'false',
pickE12: () => this.setState({ sel: 12 }),
ebg12: sel0 === 12 ? c.tn : 'transparent',
epress12: sel0 === 12 ? 'true' : 'false',
pickE13: () => this.setState({ sel: 13 }),
ebg13: sel0 === 13 ? c.tn : 'transparent',
epress13: sel0 === 13 ? 'true' : 'false',
pickE14: () => this.setState({ sel: 14 }),
ebg14: sel0 === 14 ? c.tn : 'transparent',
epress14: sel0 === 14 ? 'true' : 'false',
pickE15: () => this.setState({ sel: 15 }),
ebg15: sel0 === 15 ? c.tn : 'transparent',
epress15: sel0 === 15 ? 'true' : 'false',
pickE16: () => this.setState({ sel: 16 }),
ebg16: sel0 === 16 ? c.tn : 'transparent',
epress16: sel0 === 16 ? 'true' : 'false',
pickE17: () => this.setState({ sel: 17 }),
ebg17: sel0 === 17 ? c.tn : 'transparent',
epress17: sel0 === 17 ? 'true' : 'false',
da0: page === 'anna' && si === 0,
da1: page === 'anna' && si === 1,
da2: page === 'anna' && si === 2,
da3: page === 'anna' && si === 3,
da4: page === 'anna' && si === 4,
da5: page === 'anna' && si === 5,
da6: page === 'anna' && si === 6,
da7: page === 'anna' && si === 7,
da8: page === 'anna' && si === 8,
da9: page === 'anna' && si === 9,
da10: page === 'anna' && si === 10,
da11: page === 'anna' && si === 11,
da12: page === 'anna' && si === 12,
da13: page === 'anna' && si === 13,
da14: page === 'anna' && si === 14,
da15: page === 'anna' && si === 15,
da16: page === 'anna' && si === 16,
dt0: page === 'titanic' && si === 0,
dt1: page === 'titanic' && si === 1,
dt2: page === 'titanic' && si === 2,
dt3: page === 'titanic' && si === 3,
dt4: page === 'titanic' && si === 4,
dt5: page === 'titanic' && si === 5,
dt6: page === 'titanic' && si === 6,
dt7: page === 'titanic' && si === 7,
dt8: page === 'titanic' && si === 8,
dt9: page === 'titanic' && si === 9,
dt10: page === 'titanic' && si === 10,
dt11: page === 'titanic' && si === 11,
dt12: page === 'titanic' && si === 12,
dt13: page === 'titanic' && si === 13,
dt14: page === 'titanic' && si === 14,
dt15: page === 'titanic' && si === 15,
dt16: page === 'titanic' && si === 16,
dt17: page === 'titanic' && si === 17,
dt18: page === 'titanic' && si === 18,
dt19: page === 'titanic' && si === 19,
dt20: page === 'titanic' && si === 20,
dt21: page === 'titanic' && si === 21,
dt22: page === 'titanic' && si === 22,
dt23: page === 'titanic' && si === 23,
dt24: page === 'titanic' && si === 24,
dt25: page === 'titanic' && si === 25,
spick0: () => this.setState({ sl: 0 }),
sth0: si === 0 ? c.ac : c.ln,
spick1: () => this.setState({ sl: 1 }),
sth1: si === 1 ? c.ac : c.ln,
spick2: () => this.setState({ sl: 2 }),
sth2: si === 2 ? c.ac : c.ln,
spick3: () => this.setState({ sl: 3 }),
sth3: si === 3 ? c.ac : c.ln,
spick4: () => this.setState({ sl: 4 }),
sth4: si === 4 ? c.ac : c.ln,
spick5: () => this.setState({ sl: 5 }),
sth5: si === 5 ? c.ac : c.ln,
spick6: () => this.setState({ sl: 6 }),
sth6: si === 6 ? c.ac : c.ln,
spick7: () => this.setState({ sl: 7 }),
sth7: si === 7 ? c.ac : c.ln,
spick8: () => this.setState({ sl: 8 }),
sth8: si === 8 ? c.ac : c.ln,
spick9: () => this.setState({ sl: 9 }),
sth9: si === 9 ? c.ac : c.ln,
spick10: () => this.setState({ sl: 10 }),
sth10: si === 10 ? c.ac : c.ln,
spick11: () => this.setState({ sl: 11 }),
sth11: si === 11 ? c.ac : c.ln,
spick12: () => this.setState({ sl: 12 }),
sth12: si === 12 ? c.ac : c.ln,
spick13: () => this.setState({ sl: 13 }),
sth13: si === 13 ? c.ac : c.ln,
spick14: () => this.setState({ sl: 14 }),
sth14: si === 14 ? c.ac : c.ln,
spick15: () => this.setState({ sl: 15 }),
sth15: si === 15 ? c.ac : c.ln,
spick16: () => this.setState({ sl: 16 }),
sth16: si === 16 ? c.ac : c.ln,
spick17: () => this.setState({ sl: 17 }),
sth17: si === 17 ? c.ac : c.ln,
spick18: () => this.setState({ sl: 18 }),
sth18: si === 18 ? c.ac : c.ln,
spick19: () => this.setState({ sl: 19 }),
sth19: si === 19 ? c.ac : c.ln,
spick20: () => this.setState({ sl: 20 }),
sth20: si === 20 ? c.ac : c.ln,
spick21: () => this.setState({ sl: 21 }),
sth21: si === 21 ? c.ac : c.ln,
spick22: () => this.setState({ sl: 22 }),
sth22: si === 22 ? c.ac : c.ln,
spick23: () => this.setState({ sl: 23 }),
sth23: si === 23 ? c.ac : c.ln,
spick24: () => this.setState({ sl: 24 }),
sth24: si === 24 ? c.ac : c.ln,
spick25: () => this.setState({ sl: 25 }),
sth25: si === 25 ? c.ac : c.ln
};
}
}
