# schmkls.github.io

My personal site at https://schmkls.github.io: a collection of ideas I want to build, one Markdown file per idea. Each page has a left menu with Home and every post.

## Run locally

There is nothing to install. Open a post in VS Code and use its Markdown preview (`Cmd+Shift+V`) to see how it reads.

## Develop

### Add a post

1. Create `posts/<slug>.md`. The file name is the URL: `posts/friction.md` is `/friction`.
2. Start it with `# Title`, then one short paragraph. That paragraph is the tagline shown on Home.
3. Put images in `posts/<slug>/` and link them as `![alt](<slug>/image.png)`.

The menu and Home pick up the new post by themselves. Posts are ordered alphabetically by file name.

### What each file is for

| File | Purpose |
| --- | --- |
| `posts/<slug>.md` | One post. Its first `#` heading is the title in the menu. |
| `posts/<slug>/` | That post's images. |
| `index.md` | Home. Lists every post with its tagline, generated. |
| `_layouts/default.html` | The page around every post: the left menu and the content. |
| `style.css` | The look, dark mode from the OS, the phone layout. |
| `_config.yml` | Markdown renderer and clean post URLs. |
| `.gitignore` | Keeps local files (macOS `.DS_Store`, a private `todo/` folder, local build output) out of git. |
| `LICENSE` | The license. |

## Deploy

Push to `main`. GitHub Pages builds the site with Jekyll and publishes it (Settings → Pages → Deploy from a branch). There is no build step or workflow in this repo.
