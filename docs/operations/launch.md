# Release and human-input checklist

Local implementation is tracked in [issues 1–6](https://github.com/meshgroupire/ledjs-website/issues). Account-dependent release work remains in [issue 7](https://github.com/meshgroupire/ledjs-website/issues/7).

## Developer checks

Run `npm ci`, `npm test`, `npm run check`, `npm run build`, `npm run verify` and `npm run lint`. `npm` scripts use the project-local Node 22.22.0 binary; the system Node installation is unchanged. Netlify is pinned to the same runtime. Patched Astro 7.4.1 and React integration 7.1.0 replace the initial compatibility choice after the dependency audit.

The default local/preview build is noindex. Test a separate `CONTEXT=production` build and run `node scripts/verify-site.mjs --production`; public pages must be indexable while questionnaire, thank-you and 404 remain noindex. Reset to preview context afterward. Generated HTML must contain real content, unique metadata and factual JSON-LD without client rendering. No events, demo tickets or checkout code may ship.

Browser checks should cover 320px/390px/tablet/desktop, navigation and Escape, visible focus, no horizontal overflow, readable fonts, lazy images, enquiry prefill, disabled-form fallback, failed submission retention, successful fixture receipt and all eight questionnaire steps. Fixture tests do not establish live persistence or email delivery. Check direct unknown paths return actual 404s.

## Human inputs at the end

- Resend verified domain, approved From address, secure key and controlled recipient; Netlify form detection/entitlement and runtime context; actual persistence/mail/reply/outage tests per `email.md`.
- Approved Songo franchise assets and event photos, replacing the interim official wordmark where appropriate.
- Approved privacy/retention/booking copy and any future venue, testimonial or pricing evidence.
- Search Console property access and baseline data; analytics provider and consent approach. Measurement remains disabled until configured.
- Review the preview and make the production release decision. No production publishing is required to complete local development.

## Release and rollback

Use a non-production deploy preview first. Verify preview noindex, all static routes, real 404s, secure test-mail restrictions and zero ticket exposure. Record the preview deploy ID/URL and reviewed commit. Before production, record the previous production deploy ID so Netlify can restore it if needed. Retain existing canonical URLs and service anchors.

After an approved production deployment, check HTTPS/canonical host redirects, homepage and service content, live forms and email, sitemap/robots, and the absence of noindex on public pages. Submit the sitemap in Search Console and monitor crawl issues, accepted enquiries, response handling and booked revenue. Do not equate a successful build with a measured ranking gain or field Core Web Vitals pass.

## Verification evidence ? 21 October 2026

Production and deploy-preview builds passed: 17 HTML pages (14 indexable inventory entries), unique metadata, internal links/assets, JSON-LD parsing, sitemap exclusions and context-specific noindex. Eleven domain/transport/analytics tests passed; lint and Astro type checks passed with zero diagnostics; production dependency audit found zero vulnerabilities. Notification function bundled successfully.

Chrome checks passed at 320, 390, 768 and 1440 pixels across six key routes, including navigation, enquiry fixtures and eight questionnaire steps. Screenshots are under `docs/verification/`. Browser tests submit fixtures only; no external emails were sent. Browserslist reports an old compatibility dataset despite the compatible package update; this does not establish field performance.

Independent review found required questionnaire validation and date-sensitive recovery defects; regression tests reproduced both before fixes and passed afterward. Required fields and structural validation are shared across client/server, per-step native validation runs before navigation, and notification parsing accepts structurally valid historical event dates. Error alerts, private per-message diagnostics and unused ticket style removal address minor findings.

The existing Netlify project is `theledjs` (`808971a9-bc3b-491d-837f-3851b2600be4`). Account metadata reports Forms **not enabled**. Existing production rollback deploy: `6a1dda729802a5000883d6d2` (not changed during implementation). Live signature enforcement, registration, retention, inbox/Reply-To/idempotency/bounce results remain unverified until controlled provider setup. Final policy and image/franchise approval remain owner decisions. Measured field performance remains a post-preview/release check. No county-detail generator exists; the coverage hub avoids publishing unsupported location claims.

## Hosted preview evidence

Draft PR: https://github.com/meshgroupire/ledjs-website/pull/8

Verified deploy: https://6ad8fd73806df239a8594245--theledjs.netlify.app (commit `3e023a3`). Review alias: https://deploy-preview-8--theledjs.netlify.app . The existing Git integration created this non-production preview automatically; production remains unchanged. Netlify reports ready, Node 22 runtime and the form notification event function registered for `submission_created`.

Read-only requests confirmed public routes return 200 with noindex, sitemap returns 200, and `/events` plus an unknown path return 404. The complete Chrome smoke suite also passed against the hosted preview at all four viewport sizes. Form transport fixtures were intercepted in the browser; no real submissions or emails were sent. Registration/retention/delivery remain unverified with Forms disabled.

A generic deployment tool action was rejected by automatic approval review because it could change the live service without a release decision. No production deployment or workaround was attempted. The preview above came from the existing draft-PR workflow. Keep production release behind issue 7.
