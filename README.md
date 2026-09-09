# BTS ARMY HUB

A modern, responsive fan website for BTS built with React + Vite. This is a frontend-only
portfolio project — there is no backend or real server-side authentication.

## Features

- **Home** — hero section, intro, featured members/albums/songs, community CTA
- **Members** — all 7 BTS members with individual detail pages
- **Albums** — album grid with filter, detail pages with track lists
- **Songs** — searchable song list linked back to albums
- **Global Search** — search members, albums, and songs from the navbar
- **Login / Register** — demo authentication stored in `localStorage` (see note below)
- **Community** — post and delete comments, persisted in `localStorage`
- **Profile** — logged-in user info and their own comment activity
- **Dark / Light mode** — toggle persisted in `localStorage`
- **Responsive design** — works on desktop, tablet, and mobile
- **404 page** for invalid routes

## ⚠️ Important note on authentication

Login/Register in this project is a **frontend demo only**. Account data (including
passwords) is stored in plain text in your browser's `localStorage`. This is **not**
secure authentication — do not use real passwords, and do not treat this as a template
for production auth. It exists purely to demonstrate React state/UI patterns.

## Tech Stack

- React 18 (functional components + hooks)
- React Router v6
- Context API (theme + auth)
- Vite
- Plain CSS (CSS variables for theming, no CSS framework)
- localStorage for all persistence

## Project Structure

```
src/
├── assets/          # (empty — see "About images" below)
├── components/       # Reusable UI pieces (Navbar, Footer, cards, etc.)
├── pages/            # One file per route
├── data/             # BTS data, kept separate from UI (members, albums, songs)
├── context/          # ThemeContext, AuthContext
├── hooks/            # useLocalStorage
├── utils/            # Form validators
├── App.jsx           # Route definitions
├── main.jsx          # App entry point
└── index.css         # Global design system
```

## About images

This project doesn't ship with real member photos or album covers. Instead, it uses a
`PlaceholderCover` component that renders styled colored tiles with initials — this
keeps the UI looking intentional instead of showing broken image icons. If you want to
add real photos:

1. Put image files in `src/assets/` (e.g. `src/assets/members/rm.jpg`)
2. Import them in `src/data/members.js` or wherever needed
3. Swap `<PlaceholderCover>` for an `<img>` tag in `MemberCard.jsx` / `AlbumCard.jsx`

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Deployment

This is a static frontend app, so it deploys easily to Vercel, Netlify, or GitHub Pages.
Run `npm run build` and deploy the generated `dist/` folder.
