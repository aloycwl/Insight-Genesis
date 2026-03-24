# External Blog Platform Recommendation for Insight Genesis

## Short answer
For your current React setup, **WordPress.com / self-hosted WordPress** is the easiest and most practical choice.

Why:
- Built-in editor for non-developers.
- Native **REST API** (`/wp-json/wp/v2/posts`) + **RSS feed** out of the box.
- Easy to map fields (title, excerpt, date, featured image, link) to your existing blog card UI.
- You already have a WordPress URL in your current blog data, so this matches your current workflow.

## Quick comparison

### 1) WordPress (Recommended)
- Posting experience: very easy (Gutenberg editor)
- Integration effort: low
- Data access: REST API + RSS
- Notes: best balance of ease + control

### 2) Medium
- Posting experience: very easy
- Integration effort: medium (official APIs are limited for broad publication data)
- Data access: RSS is easiest path
- Notes: fine for simple feeds, but less control over structure/metadata

### 3) Dev.to / Hashnode
- Posting experience: easy
- Integration effort: low-medium
- Data access: APIs available; RSS available
- Notes: good for engineering blogs, but branding/content ownership may be less flexible than WordPress

## Recommended implementation path
1. Keep authoring in WordPress.
2. In your frontend, fetch posts from:
   - Preferred: WordPress REST API (`/wp-json/wp/v2/posts?_embed`)
   - Fallback: RSS feed
3. Map API response fields to your current card schema:
   - `title`, `excerpt`, `date`, `category`, `url`, `image`
4. Keep a small local fallback list if API fails.

## Migration shape for this codebase
- Replace hardcoded `featuredPost` + `blogPosts` in `src/pages/Blog.jsx` with fetched state.
- Keep the existing card layout/filter UI and only swap the data source.
- Optionally move fetch logic to a dedicated helper (e.g., `src/services/blogService.js`).

## Decision
If your goal is "post easily on platform, render on website with minimal engineering", choose **WordPress + REST API**.
