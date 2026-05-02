[← Back](../index.md)

# Pawspal — Find your perfect Pawtner

> *🐾 Find your perfect pawtner!*



## What it does

**Pawspal** scrapes [loveanimalsbcn](https://loveanimalsbcn.com/), matches you with 4 pets based on your lifestyle, and directly contacts [CAACB](https://ajuntament.barcelona.cat/benestaranimal/es/cercador-danimals-en-adopcio) shelter to start your adoption journey! 

![Pet Adoption Architecture](../assets/svg/pet_adoption_v3.svg)

🚧 *Under Construction!*

## Multi-Agent Architecture

Built with **CrewAI** — 2 specialized agents work together:

| Agent | Role |
|-------|------|
| 🕷️ Scraper | Fetches latest pets from [loveanimalsbcn](https://loveanimalsbcn.com/) |
| 🧠 Matcher | Analyzes your profile and ranks compatibility |



## Run it locally
```bash
# Install dependencies
pip install -e .

# Launch the app
uv run streamlit run app/pawspal.py
```

Available at → `http://localhost:8501`

## Stack

`Python 3.11` · `Claude code`· `beautifulsoup4`· `CrewAI` · `Ollama` · `Streamlit`