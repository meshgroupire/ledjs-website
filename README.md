# LEDJS website rebuild

Wedding-first, statically rendered Astro website with dedicated service pages, nine-county coverage and Songo Music Bingo branding. The questionnaire is a React island; marketing pages ship readable HTML without JavaScript.

## Local development

Run `npm ci`, then `npm run dev`. Node 22.22.0 is pinned in `.nvmrc`, Netlify configuration and the project-local development binary. npm scripts use the local binary; the system installation is unchanged.

Run `npm test`, `npm run lint`, `npm run check`, `npm run build` and `npm run verify`. For a production indexing check, build with `CONTEXT=production` and run `npm run verify -- --production`. Other contexts intentionally emit noindex. Browser checks: `node scripts/browser-smoke.cjs` against `npm run preview -- --host 127.0.0.1` (Chrome required).

## Launch controls

Forms default to disabled; email and WhatsApp contact links work immediately. Copy `.env.example` only for local configuration. Keep provider keys server-only. See [email operations](docs/operations/email.md), [launch checklist](docs/operations/launch.md) and [issue tracker](docs/operations/issues.md). Actual storage and inbox delivery require controlled Netlify/Resend testing before activation.

Ticketing remains a [private development wireframe](docs/wireframes/ticketing.md), with no public event or checkout routes. Analytics hooks remain inactive until a consent-aware provider is configured.

Approved concepts, research and SEO/revenue recommendations are retained under `docs/`. Publishing requires the final launch decisions tracked in issue 7; ranking and revenue improvements must be measured after launch.
