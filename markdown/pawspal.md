# Agentic Pawspal

> 🐾  *Find your perfect Pawtner!*

Discover the dog or cat that matches your lifestyle and personality through AI-powered matching.

- [How it works](#how-it-works)
- [Project Structure](#project-structure)
- [App](app)

## How it works

**Paws Pal** is your digital matchmaker for pets! The app starts by web-scraping [loveanimalsbc](https://loveanimalsbcn.com/) to gather a lineup of dogs and cats ready for adoption or foster care.

You then enter your preferences — from household dynamics (kids, space, other pets) to the kind of companion you're looking for (calm, playful, active, etc.).

Behind the scenes, **Paws Pal** uses a multi-agent system powered by [CrewAI](https://www.crewai.com/) :

1. One agent scrapes the website to fetch the latest available pets.

2. Another analyzes your profile and recommends the best matches based on compatibility.

Once you’ve selected up to four favorites, **Paws Pal** emails the shelter team with your details and top picks — giving you a head start on meeting your perfect pawtner!

Please note that you can also browse all available pets directly at: [loveanimalsbc](https://loveanimalsbcn.com/).

## Project Structure

> TODO

## Running the App

### Prerequisites
- Python 3.11.7
- Dependencies installed (see `pyproject.toml`)

### Installation & Setup

1. Install dependencies:
```bash
pip install -e .
```

2. Configure your environment variables (if needed for LLM providers, email service, etc.)

### App

Start the Streamlit app with:

```bash
uv run streamlit run app/pawspal.py
```

The app will be accessible at `http://localhost:8501` in your browser, or at `http://192.168.0.24:8501` on your phone. A deployed version is also available on [Streamlit](https://share.streamlit.io/?aliId=eyJpIjoielg2ZyswNmQ3SnlUQ2pSeSIsInQiOiJGd3lsUmRmTW55MjlcL21DUzZXVVRZZz09In0%253D).

## Stack

- 🦙 [Llama](https://llama.meta.com/)    
- 🚀 [Streamlit](https://streamlit.io/) 

### Recording (Mac)

```bash
Cmd + Shift + 5
```

1. Choose Record *Selected Portion* (best for recording just the app window).
2. Click Record.


## Test

```
coverage run -m unittest discover
coverage report -m
```

> Cmd + Shift + P > Coverage Gutters: Display Coverage

Shortcut:
```
Cmd + Shift + 7
```

## TODO

- ...
- ...



> Please note that this project is in its MVP stage. There may still be areas that require further improvement and integration. 
> This project was created with  the [agent-api-cookiecutter](https://github.com/neural-maze/agent-api-cookiecutter) Neural Maze template.
