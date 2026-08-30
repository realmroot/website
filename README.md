# Realmroot Website

Official website, blog, and documentation for [Realmroot](https://github.com/realmroot/realmroot).

Built with Astro and Starlight. Marketing pages live in `src/pages`, blog posts
in `src/content/blog`, and product documentation in `src/content/docs`.

## Development

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm check
pnpm build
pnpm deploy:dry-run
```

## Deployment

Cloudflare Workers Builds deploys this repository to the existing
`realmroot-website` Worker. Keep the Worker name aligned with `wrangler.jsonc`
when configuring the Git integration; the GitHub repository name is `website`,
but it is not the Worker name.
