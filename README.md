# Nuxt Status Page - Based on Github Issues

Create a status page using Github Issues.

Based on the good [My Pull Requests](https://github.com/atinux/my-pull-requests) by [Sébastien Chopin (atinux)](https://github.com/atinux).

## Features

- Track recent issues from any GitHub repository
- RSS feed for staying updated
- Support for both user and organization repositories
- Real-time status indicators (open/closed issues)

Not tested, but may work because it's on top of MPR:  
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAdrianoCahete%2Fnuxt-status-page&env=NUXT_GITHUB_TOKEN,NUXT_REPO_OWNER,NUXT_REPO_NAME&envDescription=Create%20a%20GitHub%20token%20and%20set%20repository%20details.&envLink=https%3A%2F%2Fgithub.com%2Fsettings%2Fpersonal-access-tokens%2Fnew&project-name=repository-status-page&demo-title=Repository%20Status%20Page&demo-description=Create%20a%20website%20with%20an%20RSS%20feed%20to%20track%20issues%20from%20any%20GitHub%20repository.)

## Setup

Make sure to install the dependencies with [pnpm](https://pnpm.io/installation#using-corepack):

```bash
pnpm install
```

Copy the `.env.example` file to `.env` and configure your settings:

```bash
cp .env.example .env
```

Configure your environment variables in the `.env` file:

```bash
# Create a GitHub token with no special scope
NUXT_GITHUB_TOKEN=your-github-token
```

You can configure the repository in `app/app.config.ts`:

```typescript
export default defineAppConfig({
  // ... other config
  repo: {
    owner: 'nuxt', // Repository owner (user or organization)
    name: 'nuxt',     // Repository name
  },
})
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

## Credits

This project is inspired and based on the good [My Pull Requests](https://github.com/atinux/my-pull-requests) by [Sébastien Chopin (atinux)](https://github.com/atinux).
that was originally inspired by [Anthony Fu](https://github.com/antfu)'s [releases.antfu.me](https://github.com/antfu/releases.antfu.me) project.

## License

[MIT](./LICENSE)
