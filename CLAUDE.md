# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Aurelio D'Urso's personal website (aureliodurso.com) — a small React + Vite single-page app.

## Commands

```bash
yarn dev       # start Vite dev server
yarn build     # production build to dist/
yarn preview   # preview the production build locally
yarn lint      # eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0
```

There is no test suite configured in this repo.

Package manager is Yarn (`yarn.lock` is present, use `yarn` not `npm`).

## Architecture

- Entry point is [src/main.jsx](src/main.jsx), which mounts [src/App.jsx](src/App.jsx).
- [App.jsx](src/App.jsx) wraps the app in `HelmetProvider` (react-helmet-async, for per-page `<title>`/meta tags) and `react-router-dom`'s `BrowserRouter`. Routes are defined inline: `/` → [Home](src/pages/Home.jsx), `/work` → [Work](src/pages/Work.jsx), `*` → [NoPage](src/pages/NoPage.jsx).
- On mount, `App` computes a seasonal CSS class (`spring`/`summer`/`autumn`/`winter`/`christmas`) via `getPeriodOfTheYear()` in [src/classes/utils.jsx](src/classes/utils.jsx) and appends it to the root container's className. This class drives the background gradient for the whole page (see the season rules in [src/style/App.scss](src/style/App.scss)). Season date ranges (including the `christmas` override, which wraps across the year boundary) are defined in [src/constants/constants.js](src/constants/constants.js) as `SEASONS`.
- [Home.jsx](src/pages/Home.jsx) reads two JSON arrays from Vite env vars at runtime: `VITE_REACT_APP_MYMESSAGES` (typewriter-effect messages, each with `message` and display `time`) and `VITE_REACT_APP_QUALITIES` (a rotating list of short strings). These are parsed with `JSON.parse(... || '[]')` and are expected to be set in `.env` (not committed, though a placeholder `.env` currently exists locally — check before assuming values are present). The typewriter/fade effects (deletion/write speed, fade timing) are driven by constants in `constants.js` (`SECOND`, `WORDDELETIONTIME`, `WORDWRITETIME`).
- Styling is a mix of one global SCSS file ([src/style/App.scss](src/style/App.scss)) with a hand-rolled CSS "speech bubble" component (`.bubble`, pixel-shadow technique) and season-based background classes, plus a separate [NoPage.css](src/style/NoPage.css) for the 404 page and [index.css](src/style/index.css) for base resets. There is no CSS-in-JS or CSS modules setup.
- Static assets (profile photo, social icons, christmas background) live in [src/assets/](src/assets/) and are imported directly into components.
- [index.html](index.html) contains the Google Analytics (gtag.js) snippet directly; it's not injected via React.

## Notes

- This is a small, mostly finished personal site — favor minimal, targeted changes over introducing new abstractions, state management, or build tooling.
- Season/date logic in `getPeriodOfTheYear` has a `console.log(seasons)` left in — be aware it's noisy but intentional-looking legacy debug output, not something to silently "fix" unless asked.
