# schmkls.github.io

My personal site at https://schmkls.github.io: a collection of ideas I want to build, one Markdown file per idea. Each page has a left menu with Home and every post.

## Run locally

**One post:** open it in VS Code and use its Markdown preview (`Cmd+Shift+V`). Nothing to install.

**The whole site** (menu, Home, styling) as GitHub Pages will build it: run Jekyll inside the Docker image that GitHub Pages itself uses ([actions/jekyll-build-pages](https://github.com/actions/jekyll-build-pages)). It needs Docker, nothing else.

```sh
docker run --rm -it --platform linux/amd64 -v "$PWD":/src:ro -p 4000:4000 \
  -e PAGES_REPO_NWO=schmkls/schmkls.github.io -e RUBYOPT=-rgithub-pages \
  --entrypoint sh ghcr.io/actions/jekyll-build-pages:v1.0.13 -c \
  'echo "exclude: [todo, dist, node_modules]" > /tmp/local.yml &&
   jekyll serve --source /src --destination /tmp/_site --config /src/_config.yml,/tmp/local.yml --host 0.0.0.0'
```

Open http://localhost:4000. It rebuilds when you save a file; reload the page to see the change. `Ctrl+C` stops it.

The command does three things a plain `jekyll serve` would not:

- `RUBYOPT=-rgithub-pages` loads GitHub Pages' configuration and plugins. These give `markdown: GFM`, a title from each post's `#` heading, and image links that work at `/<slug>`.
- `local.yml` leaves out folders that exist only on your machine and never reach GitHub. `todo/` in particular contains `{{` text, which fails the build.
- The site is built into the container's `/tmp`, so no `_site/` appears in the repo.

GitHub's [Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll) describes the other route: a `Gemfile` and Ruby installed on your machine. This repo avoids that on purpose so it has no dependencies.

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
