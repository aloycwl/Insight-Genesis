# Blog Content Editing Guide

This project renders `/blog` from **hardcoded data in the frontend**, not from a database.

## Where blog content comes from
- Route: `src/App.jsx` maps `/blog` to `<Blog />`.
- Page component: `src/pages/Blog.jsx` defines both:
  - `featuredPost` object
  - `blogPosts` array
- Blog images are local static assets imported at the top of `src/pages/Blog.jsx` from `src/assets/blog*.png`.

## How to edit existing blog content
Open `src/pages/Blog.jsx` and edit:
- `featuredPost.title`, `featuredPost.excerpt`, `featuredPost.date`, etc.
- Items inside `blogPosts` (`title`, `excerpt`, `date`, `category`, `readTime`, `url`).

If `url` is set, the card shows a clickable `Read` link.
If `url` is `null`, `Read` is non-clickable text.

## How to add a new blog card
1. Add or reuse an image in `src/assets/`.
2. Import it in `src/pages/Blog.jsx`.
3. Add a new object to `blogPosts` with a unique `id` and desired fields.
4. If introducing a new category, add its label in the `categories` array.

## Optional improvement paths
- Move `blogPosts` into a separate data file (e.g., `src/data/blogPosts.js`) so content edits are easier.
- If non-developers need to publish posts, switch to a CMS/API (WordPress REST API, Contentful, Sanity, etc.) and fetch posts in `Blog.jsx`.

