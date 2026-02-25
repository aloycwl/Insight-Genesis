# Insight Genesis

## Project Overview

A React + Vite single-page application for Insight Genesis — an AI personal insights platform. The site features a homepage, blog, FAQ, solutions pages, staking, and contact forms using EmailJS.

## Tech Stack

- **Framework**: React 18 with React Router v6
- **Build Tool**: Vite 4
- **Styling**: Tailwind CSS v4 + PostCSS
- **Email**: EmailJS (@emailjs/browser)
- **Auth**: Magic SDK (magic-sdk)
- **Other**: blockies (avatar generation)

## Project Structure

```
src/
  components/    # Shared components (Navigation, Footer, ContactFormPopup, etc.)
  pages/         # Route-level pages (Home, About, Blog, FAQ, Solutions, etc.)
  hooks/         # Custom hooks (useAuth)
  assets/        # Images, fonts, icons, SVGs
public/
  mp4/           # Video backgrounds used on various pages
```

## Configuration

- **Dev server**: `0.0.0.0:5000` with `allowedHosts: true` for Replit proxy
- **Env prefix**: `REACT_APP_` (not `VITE_`)
- **Env file**: `.env` (EmailJS credentials)
- **Deployment**: Static site, build to `dist/`

## Environment Variables

| Variable | Purpose |
|---|---|
| `REACT_APP_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `REACT_APP_EMAILJS_PUBLIC_KEY` | EmailJS public key |

## Running the App

```bash
npm run dev      # Development server on port 5000
npm run build    # Production build to dist/
```
