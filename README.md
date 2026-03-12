# Front End Development Playground

I'm getting into the front end development game a little late (ridiculously late to be honest), the positive is... this means everything is still new, exciting and available for me to spend some time learning! Join me in playing around with "all things Javascript"!!

## Astro & Github

The site has been migrated from Gatsby to [Astro](https://astro.build/). There are a ton of amazing developers and designers that have provided a wealth of resources - I'm hoping I can pick up on a portion of what they've made available during this process.

### Stack

- [Astro](https://astro.build/) - static site generator
- [React](https://react.dev/) - UI components via `@astrojs/react`
- [Tailwind CSS](https://tailwindcss.com/) - utility-first CSS via `@astrojs/tailwind`
- [MDX](https://mdxjs.com/) - markdown + JSX content via `@astrojs/mdx`
- [Sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) - auto-generated sitemap via `@astrojs/sitemap`

### Development

```bash
npm install
npm run dev      # start local dev server
npm run build    # build for production
npm run preview  # preview production build
```

### Releases

Pull Requests are validated and releases are deployed to GitHub Pages using GitHub Actions:

- **[validate-pull-request](.github/workflows/validate-pull-request.yml)** – builds the site on every PR targeting `main`
- **[publish](.github/workflows/publish-astro.yml)** – builds and deploys to GitHub Pages on every push to `main` using [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)

## Attribution

Thanks to a lot of people smarter and better than I!

### Social Icons

<div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

<div>Icons made by <a href="https://www.flaticon.com/authors/vitaly-gorbachev" title="Vitaly Gorbachev">Vitaly Gorbachev</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
