[← Back](../index.md)

# Pawspal — Find your perfect Pawtner

> *AI-powered pet matchmaking. Because the right companion changes everything.*

---

## What it does

**Pawspal** scrapes a live adoption shelter, learns your lifestyle, and recommends the dogs or cats that truly fit you — then emails the shelter on your behalf.
```
You describe your life
        ↓
Agent 1 scrapes shelter for available pets
        ↓
Agent 2 matches pets to your profile
        ↓
You pick your favorites (up to 4)
        ↓
Shelter receives your email automatically 🐶
```

---

## Multi-Agent Architecture

Built with **CrewAI** — two specialized agents work together:

| Agent | Role |
|-------|------|
| 🕷️ Scraper | Fetches latest pets from [loveanimalsbcn](https://loveanimalsbcn.com/) |
| 🧠 Matcher | Analyzes your profile and ranks compatibility |

---

## Run it locally
```bash
# Install dependencies
pip install -e .

# Launch the app
uv run streamlit run app/pawspal.py
```

Available at → `http://localhost:8501`

---

## Stack

`Python 3.11` · `CrewAI` · `Llama` · `Streamlit`

🔗 [Live Demo on Streamlit](https://share.streamlit.io)