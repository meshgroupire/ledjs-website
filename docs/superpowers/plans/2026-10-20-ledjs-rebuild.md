# LEDJS Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Inline execution is recommended; the user may choose a delegated implementation instead.

**Goal:** Ship the approved multi-page LEDJS design with reliable Resend enquiries and county-focused search coverage, keeping ticketing as non-public wireframes.

**Architecture:** Generate public marketing pages with Astro static output on the existing Netlify host, preserving the React wedding questionnaire as an island. Netlify Forms persists leads; a platform-verified form event validates stored submission fields and sends owner/customer mail through Resend. Ticketing documents and mockups remain outside the published build.

**Tech Stack:** Astro, React, TypeScript, CSS tokens, Netlify Forms/Functions, Resend, Node test runner for isolated domain/email logic, generated-HTML checks and browser smoke checks. Pin compatible supported package versions after checking engines.

**Spec:** `docs/superpowers/specs/2026-10-20-ledjs-rebuild-design.md`, together with `docs/design-concept/design-direction.md` and the approved visual concept.

## Global Constraints

- Lead with full-evening wedding DJs and after-band sets, then party/corporate DJ services. Position LED wristbands as an optional differentiator.
- Brand music bingo as Songo Music Bingo with an explicit franchise relationship; no Smile imagery or references may ship. Use the research and page drafts in `docs/research/2026-10-20-wedding-dj-and-songo.md` and `docs/content/`.
- Use `+353868957442` for both telephone and WhatsApp links; display `086 895 7442`.
- Use `dave@theledjs.ie` as the owner enquiry destination unless the owner changes it.
- Use Resend for owner notifications and customer acknowledgements, exclusively from server-side code.
- Target Cavan, Leitrim, Westmeath, Longford, Meath, Mayo, Galway, Dublin and Offaly.
- Keep ticketing out of production output, public navigation, site search, structured data and the sitemap. Retain its wireframes outside the production build.
- Preserve `/`, `/services`, `/about`, `/contact` and `/wedding-questionnaire`; retain useful existing `/services#...` section targets.
- No invented reviews, venues, local offices, customer counts, pricing, scarcity or availability.
- Work locally first; do not claim deployment, delivered email or measured ranking improvement without evidence.

## Review Focus

- An existing bookmark or service anchor must reach useful content rather than a soft 404 — Task 1/2 output checks.
- A county without approved local evidence must not generate a thin public page — Task 3 route inventory checks.
- An accepted enquiry must remain recoverable when one of the Resend messages fails — Task 4 provider-outage and replay tests.
- Questionnaire answers containing markup, apostrophes or multiline text must retain meaning without injecting HTML — Task 4 escaping and field parity tests.
- A disabled ticket feature must not be directly discoverable by URL or included in the sitemap/bundle — Task 5 output inventory checks.

## File responsibility map

| Unit | Files and responsibility |
| --- | --- |
| Build/routing | `astro.config.mjs`, `package.json`, `package-lock.json`, `tsconfig.json`, `netlify.toml`, `public/_redirects`: one static route owner and reproducible build |
| Identity/content | `src/config/business.ts`, `src/content/services.ts`, `src/content/coverage.ts`: approved facts, phone, service copy, nine-county inventory |
| Shared UI | `src/layouts/SiteLayout.astro`, `src/components/site/{Header,Footer,MobileContact,EnquiryForm}.astro`, `src/styles/site.css`: the approved design and contact journey |
| Page content | `src/pages/*.astro`, `src/pages/services/[slug].astro`, `src/pages/areas/[slug].astro`: statically generated public routes |
| SEO | `src/lib/seo.ts`, `src/components/site/SeoHead.astro`, `src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts`: page identity, published inventory and indexing policy |
| Enquiry domain | `src/lib/enquiries/{schema,reference,client}.ts`: form contracts, non-authorizing references and honest UI states |
| Email processing | `netlify/functions/form-notifications.mts`, `netlify/lib/{enquiry-schema,email-templates,send-notifications}.mts`: verified event handling, escaping, Resend and idempotency |
| Existing questionnaire | `src/pages/WeddingQuestionnaire.jsx`, `src/components/enquiries/WeddingQuestionnaire.jsx`, `src/pages/wedding-questionnaire.astro`, `public/__forms.html`: preserve existing fields and steps while switching transport |
| Checks/docs | `scripts/verify-site.mjs`, `tests/enquiries/*.test.mjs`, `docs/operations/{email,launch}.md`, `docs/wireframes/ticketing.md`: meaningful verification, launch and recovery procedures |

Existing React pages stay until replacements build and pass checks, then remove unused SPA entrypoints and EmailJS dependencies in a controlled cleanup. Preserve the original concept artifacts and the user's `ui_skill.md`.

### Task 1: Establish static rendering without breaking existing destinations

**Files:** build/routing files above; create `src/layouts/SiteLayout.astro`, `src/pages/{index,services,about,contact,wedding-questionnaire,404}.astro`, `scripts/verify-site.mjs`.

**Interfaces:** `SiteLayout` accepts `{ title, description, canonicalPath, noindex?, children }`. Generated routes retain the existing extensionless public URLs. The questionnaire is mounted with React hydration and noindex.

- [ ] Record baseline `npm run build`/lint results, existing routes, service anchors and questionnaire field/step inventory. Preserve current untracked concept files. Create an isolated checkout before implementation according to the worktree workflow.
- [ ] Add a generated-output check that fails until each existing route has real content/title in HTML, the questionnaire is noindex, and a 404 page exists. Do not enforce a fabricated performance score.
- [ ] Select supported Astro/React integration versions after checking engine requirements; pin the host Node version and reproducible lockfile. Install only the needed migration dependencies.
- [ ] Implement static page generation, preserve existing URL shapes, and replace competing catch-all SPA routing with Netlify static routing. Keep any still-required questionnaire route functional during the migration.
- [ ] Run `npm run build` and `node scripts/verify-site.mjs`. Expected: static files for each retained destination, real H1/content in marketing HTML, noindex utility, no universal 200 rewrite. Document any baseline failures separately.
- [ ] Review the scoped diff; commit only implementation-owned files if repository policy permits commits.

### Task 2: Build the visual system and complete service journeys

**Files:** shared UI, `src/config/business.ts`, `src/content/services.ts`, `src/pages/services/[slug].astro`, current homepage/about/contact pages and `src/assets/` optimised imagery.

**Interfaces:** `business` exports canonical base URL, owner email, display phone, `tel:+353868957442` and WhatsApp number `353868957442`. `services` exports typed records `{ slug, legacyAnchor, title, description, image, inclusions, body }`. `EnquiryForm` consumes optional `{ service, occasion }` prefill.

- [ ] Translate the concept's type, colour, spacing, responsive navigation and contact actions into shared tokens/components. The primary homepage action starts an enquiry; remove public events promotion.
- [ ] Build the service hub and seven detailed service destinations: `wedding-dj`, `party-dj`, `corporate-entertainment`, `music-bingo`, `speed-quizzing`, `led-wristbands`, `karaoke` under `/services/`. Preserve the six existing hub anchors and link them to the relevant pages.
- [ ] Use the researched wedding page brief: compare the two confirmed formats, explain music planning and inclusions, then introduce wristbands. Use `Wedding DJ Longford & the Midlands | LEDJS` as the initial title; keep one canonical wedding destination.
- [ ] Apply Songo branding to `/services/music-bingo`, with franchise attribution, official source link and LEDJS enquiry contact. Replace legacy image references; verify no Smile image survives in the public asset tree or fresh output. Use approved franchise assets once supplied; do not relabel old photography.
- [ ] Use existing factual content and images, with useful original service copy, inclusions, FAQs and contextual enquiry links. Do not publish a story or testimonial unless its source/permission is supportable.
- [ ] Optimise selected photographs into responsive variants, preserve layout dimensions and hero priority, and reduce client JS. Retain Google Fonts only as a temporary development fallback until licensed self-hosted assets are available.
- [ ] Verify in-browser at 320px, 390px, tablet and desktop: navigation, service-to-enquiry prefill, form keyboard order, focus visibility, reduced motion, contact-bar clearance and phone/WhatsApp destinations. Confirm fallback text remains readable if fonts fail.
- [ ] Run build/output checks; expected: all service pages reachable through ordinary links and useful with JavaScript disabled. Review screenshots against the approved concept, then commit the scoped change.

### Task 3: Add county coverage and a single source of SEO metadata

**Files:** `src/content/coverage.ts`, `src/pages/service-areas.astro`, `src/pages/areas/[slug].astro`, `src/lib/seo.ts`, `src/components/site/SeoHead.astro`, sitemap/robots routes and output checker.

**Interfaces:** `coverage` exports nine `{ slug, name, publishDetail, approvedContent? }` records in the user's order, with `offaly` as the slug. `publishedPages` contains only indexable canonical routes. `getPageSeo(path)` returns title, description, canonical, social image and factual JSON-LD.

- [ ] Add failing inventory checks: exactly the nine named counties appear in coverage; `Offaly` is correctly spelled; a county with `publishDetail:false` produces no public detail route.
- [ ] Implement a useful coverage hub, county selection and contextual service copy. Set county detail records to unpublished until they meet the spec's original-content requirement; publish eligible pages only with evidence.
- [ ] Generate page metadata, organization/service/breadcrumb JSON-LD and share previews from shared facts. Remove obsolete keywords metadata and factual conflicts.
- [ ] Generate sitemap and robots from the public inventory. Apply deployment-context noindex independently of canonical URL; exclude the client questionnaire, thank-you page and all drafts. Do not use robots disallow as a replacement for noindex.
- [ ] Run `npm run build` and output checks. Expected: unique titles/descriptions/canonicals, one H1, valid JSON-LD, correct county inventory, preview noindex, no private/draft URLs in sitemap. Test a production-context build separately to ensure noindex does not leak.
- [ ] Verify old links/anchors and canonical host assumptions; document redirects requiring live validation, then commit.

### Task 4: Replace EmailJS with persisted submissions and Resend

**Files:** enquiry/email modules, `netlify/functions/form-notifications.mts`, static form definitions, existing questionnaire component, `.env.example`, `docs/operations/email.md`, `tests/enquiries/*.test.mjs`.

**Interfaces:** `parseEnquiry(data)` and `parseQuestionnaire(data)` return validated, bounded typed payloads or field errors; `renderOwnerEmail(payload)`/`renderAcknowledgement(payload)` return `{subject,html,text}`. `sendNotifications(payload,{resend,config})` uses independent owner/customer idempotency keys derived from the stable correspondence reference. The typed Netlify `formSubmitted` handler accepts only the two known form contracts and performs server-side validation before mail calls.

- [ ] Write meaningful failing tests for malformed email/date, missing required venue/county, oversized notes, invalid form name, all nine valid county values, multiline questionnaire values and HTML escaping. Use test fixtures without real customer data.
- [ ] Implement the form payload schema, shared form names/fields, safe template rendering and non-authorizing references. Snapshot the existing questionnaire field keys and prove no existing answers are dropped by the new transport.
- [ ] Implement persisted Netlify forms, URL-encoded submission, honeypot and accessible pending/received/error states. Failed submission retains answers. Success means request received, not booking confirmed or email delivered. Include matching static questionnaire fields for deploy-time detection.
- [ ] Implement the platform-signed form event and Resend integration. Ignore unknown forms; validate again; escape values; use verified sender and correct Reply-To; use stable provider idempotency keys for owner/customer mail independently. Do not expose a public arbitrary-recipient sending endpoint.
- [ ] Test partial failure: owner send succeeds/customer send fails; replay uses the same owner key and a stable customer key, preserving the persisted lead. Record that provider idempotency has a bounded window and manual recovery outside it must reconcile delivery first. Do not promise indefinite exactly-once delivery.
- [ ] Add missing-config and preview-recipient guards, private logs and an operator recovery procedure. Replace both EmailJS callers; remove the dependency only after both flows pass. Add server-only environment examples without real secrets.
- [ ] Run domain/email tests and build checks; scan public output for secret identifiers/keys. In an explicitly configured deployed preview, verify form registration, submission retention, actual owner/customer delivery, Reply-To, spam handling, questionnaire parity and outage recovery. Local mocks cannot establish these deployment results.
- [ ] Document the exact remaining setup: Resend key in Functions scope, verified sending DNS, approved sender, Netlify form detection/entitlement and recipient restrictions. Commit the scoped change.

### Task 5: Retain hidden ticketing wireframes and add measurement hooks

**Files:** `docs/wireframes/ticketing.md`, existing concept artifacts, `src/lib/analytics.ts`, page interaction hooks, output checker.

**Interfaces:** `trackIntent(name, { service?, county?, sourcePath? })` accepts only an allowlisted non-personal event schema and does nothing without configured consent/provider. There is no production ticket API or public event route.

- [ ] Document wireframes for listing → event detail → ticket selection → checkout → confirmation/recovery, plus organizer/door operations. Record open questions about capacity, fees, refunds, scanning, transfers and promoter roles. Existing sample checkout remains in the local design reference only.
- [ ] Add a build-output assertion that no event route, sample event title, ticket Offer/Event schema or checkout script ships. Verify direct `/events` and sample paths return 404 on the preview host.
- [ ] Add disabled-by-default, consent-aware analytics hooks for enquiries/call/WhatsApp intent. Keep payloads free of names, emails and notes. Successful receipt tracking must reflect server/form acceptance; label chat clicks as intent.
- [ ] Test event payload allowlisting and no-provider behaviour. Confirm county coverage metrics can be reported without tracking personal fields. Run build/output checks and commit.

### Task 6: Complete release verification and prepare a reviewable preview

**Files:** `docs/operations/launch.md`, actual approved privacy/booking page content, remaining migration cleanup.

**Interfaces:** launch checklist records each check as pass/fail/unverified, with evidence, preview URL/commit when available and an explicit rollback target. It never marks missing account-dependent checks as passed.

- [ ] Remove unused SPA entrypoints and stale staging widget code after verifying all replacements. Keep local review/wireframe artifacts outside `dist`; preserve useful legacy links and questionnaire behaviour.
- [ ] Run the production build, meaningful tests, output/metadata/link checks and changed-code lint/type checks. Separate unrelated pre-existing failures from regressions; fix regressions.
- [ ] Perform browser checks for mobile/desktop layouts, keyboard-only navigation, form validation/error recovery, no-JS marketing content, reduced motion, accessible labels/announcements and image/font failure states. Validate structured data using appropriate tools; do not imply rich-result eligibility guarantees.
- [ ] Prepare a Netlify deploy preview within the selected project's access settings. Verify actual status codes, form registration, preview noindex, restricted test mail and no publicly reachable ticketing. Capture screenshots and record outstanding dependencies.
- [ ] Approve final factual copy and policies before production release. Configure Search Console/analytics only when account details and consent approach are provided; establish a prelaunch baseline where access permits.
- [ ] Prepare a production release/rollback procedure. After the release decision, verify canonical redirects, real forms/mail, sitemap submission and monitoring. Measure field performance and enquiries/booked revenue over time rather than claim a launch-day ranking improvement.

## Execution and handoff

Recommended: implement directly in this session, milestone by milestone, because the rendering, page content and form contracts share interfaces. Keep ticketing as a separate later specification. A delegated workflow is an alternative if the user wants independent per-task reviews; no agents are required to produce this plan.

The first reviewable milestone is the rebuilt homepage, shared navigation/footer, service hub and one complete service page, running locally with real static HTML. This lets the owner assess the actual design early while the remaining pages and email integration follow.

No Resend key is required to build the layout or write/test the integration. Actual delivery needs secure provider configuration and verified DNS; credentials must not be pasted into source files or public chat. Netlify account entitlement/cost and policy text must be checked before activating collection. No estimate is claimed for provider/DNS approval or search ranking changes.
