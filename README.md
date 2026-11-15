# schmkls.github.io

Ideas I want to build, written as plain Markdown. The site at https://schmkls.github.io looks like GitHub's Markdown preview: a left menu with Home and every post, and no JavaScript.

## Add a post

1. Create `posts/<slug>.md`. The file name is the URL: `posts/friction.md` is `/friction`.
2. Start it with `# Title`, then one short paragraph. That paragraph is the tagline shown on Home.
3. Put images in `posts/<slug>/` and link them as `![alt](<slug>/image.png)`.
4. Commit and push. The menu and Home update by themselves. Nothing else to touch.

## What each file is for

| File | Purpose |
| --- | --- |
| `posts/<slug>.md` | One post. Its first `#` heading is the title in the menu. |
| `posts/<slug>/` | That post's images. |
| `index.md` | Home. Lists every post with its tagline, generated. |
| `_layouts/default.html` | The page around every post: the left menu and the content. |
| `style.css` | The GitHub-like look, dark mode from the OS, the phone layout. |
| `_config.yml` | Uses GitHub's Markdown renderer and gives posts clean URLs. |
| `.gitignore` | Keeps local files (macOS `.DS_Store`, a private `todo/` folder, local build output) out of git. |
| `LICENSE` | The license. |

## How it is built

GitHub Pages runs Jekyll on every push to `main` (Settings → Pages → Deploy from a branch). There is no build of our own, no workflow and no dependencies. Posts are ordered alphabetically by file name.

To preview a post, open it in VS Code's Markdown preview.
