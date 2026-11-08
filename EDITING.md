# How to edit the site

The site is one static page that switches between views (Home, Journey, PawsPal, ANNa, SAG Mill, Titanic). `npm run build` assembles it into `dist/index.html`; GitHub Actions does this on every push to `master`.

## Journey: the data jobs (Starlab, Assist Digital, botshelf.ai, Trialing)

Edit **`src/journey.yaml`**. Each job has:

- `card`: what shows on the timeline (role, company, city, badges).
- `details`: what shows in the panel when you click the card (company, role, location, work mode, projects, stack).
- `projects`: a `title`, one-line `text`, a small `tag` (shown underlined) and an `icon` (eeg, doc, db, chat, gear, spark, txt, obj, calc, idc).
- `stack`: tools grouped under `Languages & Core`, `Frameworks & Libraries`, `Tools & Infrastructure`, `AI & LLM`. Leave a group out to hide its row.

Commit the file and the site updates in about a minute.

## Everything else

| What | File |
|---|---|
| Nav, page frame, footer | `src/shell.html` |
| Home (intro, timeline overview, projects) | `src/pages/home.html` |
| Journey page (building-engineering jobs, studies, soft-skills radar) | `src/pages/journey.html` |
| PawsPal page | `src/pages/paws.html` |
| ANNa / SAG Mill / Titanic | `src/pages/anna.html`, `sag.html`, `titanic.html` |
| Colors, fonts, spacing | `src/styles.css` (theme colors live in `src/component.js`, search `TOK`) |
| Page logic (clicks, sliders, slides) | `src/component.js` |
| Images, PDFs | `public/assets/blobs/` (reference as `assets/blobs/<file>`) |

Text in the page files is plain HTML. Search for the words you want to change.
