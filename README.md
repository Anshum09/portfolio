# Portfolio

Everything you edit lives in `content/`. You never touch the React code to add work.

## Add a project

    npm run new "Pulley bracket"

That creates `content/projects/pulley-bracket/index.md`. Open it, fill in the top block
(title, summary, category, status, date, tools), write a few paragraphs, and drop your
renders or photos into the same folder. The first image becomes the cover. Any other
images show up in a gallery, or place one inside the text with `![Caption](render.png)`.

Set `featured: true` for a wide card at the top, or `draft: true` to hide a project
until it is ready. Folders starting with `_` are ignored.

## Edit your info

`content/profile.json` holds your name, tagline, email, links, and the background list.

## Run it locally

    npm install
    npm run dev

## Publish it (once)

1. Make a GitHub repo and push this folder to the `main` branch.
2. In the repo, Settings, Pages, set Source to "GitHub Actions".

After that, every push to `main` rebuilds and publishes the site. Adding a project is:
make the folder, push. Netlify and Vercel also work: import the repo, build command
`npm run build`, output folder `dist`.
