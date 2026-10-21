# LEDJS rebuild: agreed direction and release specification

## Authority and objective

The user approved proceeding from the existing HTML design concept and optimisation review on 20 October 2026, selected Resend, confirmed the displayed mobile number, named nine target counties, and requested hidden ticketing wireframes while the feature scope is developed. This document consolidates those instructions into a release specification. It supplements `docs/design-concept/design-direction.md` and `docs/design-concept/proposed-review.md`; these updated requirements take precedence over the illustrative public events in the concept.

Build a distinctive, fast, multi-page entertainment website that converts relevant searches into qualified enquiries and confirmed bookings. The first release sells LEDJS services. Ticket sales are a separate future subsystem.

## Fixed requirements

- Wedding DJs are the primary marketing offer: full-evening wedding DJ entertainment and after-band sets, confirmed by the owner. Other party and corporate DJ work follows. LED wristbands are a differentiator and optional enhancement, not the lead proposition.
- Music bingo is branded Songo Music Bingo and identifies LEDJS as a Songo franchisee. Remove legacy Smile branding and imagery from public use. The owner has an approved asset pack; use the unmodified official wordmark until it is available in the workspace.
- Follow `docs/research/2026-10-20-wedding-dj-and-songo.md` and the original page drafts in `docs/content/`; do not copy competitor claims, testimonials, prices or package guarantees.
- Apply the visual direction in `ui_skill.md` and `docs/design-concept/index.html`: real photography, poster-scale condensed type, indigo, cyan, raspberry and light enquiry surfaces.
- Use `+353868957442` for both telephone and WhatsApp links; display `086 895 7442`.
- Use `dave@theledjs.ie` as the owner enquiry destination unless the owner changes it.
- Use Resend for owner notifications and customer acknowledgements, exclusively from server-side code.
- Target Cavan, Leitrim, Westmeath, Longford, Meath, Mayo, Galway, Dublin and Offaly. The user's “Offally” is normalised to the official county spelling “Offaly”.
- Keep ticketing out of production output, public navigation, site search, structured data and the sitemap. Retain its wireframes outside the production build.
- Preserve `/`, `/services`, `/about`, `/contact` and `/wedding-questionnaire`; retain useful existing `/services#...` section targets.
- No invented reviews, venues, local offices, customer counts, pricing, scarcity or availability.
- Local development and preview are authorized. Production deployment and real email delivery must be explicitly identified and verified as separate release steps.

## Architecture choice

Use Astro static output for public pages, retaining React for the existing wedding questionnaire and any interactions that genuinely benefit from it. Keep Netlify as the configured host. This replaces the empty SPA shell with generated page HTML and avoids hydrating the entire marketing site. It is a rendering and maintenance decision, not a claim that Google cannot index React.

Retain source content and useful imagery; migrate deliberately rather than deleting the old implementation at the start. Install versions supported by the selected Astro/React integration and current Node LTS; check the installed toolchain before pinning requirements. Preserve a reproducible lockfile. Do not assume the current Node 22.17.1 satisfies a future package's engine floor.

Store services and coverage as typed content shared by navigation, page generation and structured data. Use one SEO layout and one business identity configuration. Author original copy before generating public routes. Use local optimised image variants and explicit dimensions.

## Release-one pages

Homepage; services hub; wedding DJ; party DJ; corporate entertainment; music bingo; speed quizzing; LED wristbands; karaoke; about; contact; service-area hub; privacy; booking information; thank-you page; real 404 page. Preserve the wedding questionnaire as a non-promoted, noindex client utility.

Start with a coverage hub listing all nine counties and county selection in enquiries. Keep a structured content record for each county. Publish a dedicated county page only when its original content is useful independently: specific service/travel guidance, real local experience or a permissioned event example, and relevant enquiries. Do not publish nine near-duplicate county pages or a service-by-county matrix. All nine counties remain targeted through the coverage hub, service content and business profile work while richer pages are developed.

Event stories can use a collection and template, but publish only genuine approved entries. Empty archive pages and sample events must not ship. Do not introduce a CMS or customer account system in release one.

## Enquiries and Resend

Use Netlify Forms for persisted enquiry and questionnaire records, with a signed platform form-event handler sending Resend messages after verified submissions. This retains leads even when notification delivery fails and provides an existing owner-facing submissions/export interface. Confirm form detection, account entitlement, usage costs and retention before activation; these are deployment dependencies, not reasons to block the front-end rebuild.

Define `ledjs-enquiry` and `ledjs-wedding-questionnaire` as distinct forms. Include matching static field definitions for the React-rendered questionnaire. Use native required fields plus client validation, a honeypot, Netlify filtering and server-side schema validation before sending email. Never treat a client-generated enquiry reference as authorization. The reference identifies correspondence only.

Enquiry fields: reference, name, email, event type, optional event date with an explicit undecided state, county, venue/town, selected service, optional phone, optional guest count and notes. Capture source path without unnecessary tracking identifiers. Required name/email/occasion/county/location should stay short; length and date limits must be enforced in email processing as well as the interface.

Submission receipt and email delivery are distinct states. The site can confirm receipt after the form service accepts the request; it must not claim a date is booked or that an email arrived. Fields persist on failure and duplicate submit clicks are disabled while pending. Resend sends owner notification and customer acknowledgement with separate idempotency keys. HTML templates escape untrusted values; use a verified business sender and the customer email only as Reply-To on owner mail.

Use server-only `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ENQUIRY_TO_EMAIL`. No `VITE_` or `PUBLIC_` secret variables. Missing configuration produces an actionable operator error; never simulate success in production. Preview sends must be disabled by default or restricted to explicit test recipients. Persisted leads remain accessible when Resend is unavailable. Log delivery errors with reference/provider status and avoid logging raw questionnaire answers. Include a documented operator replay/recovery procedure using stable idempotency keys; do not assume platform events are a durable retry queue. Test email delivery and reply routing on a deployed preview before replacing the old integration.

Migrate both the general form and existing eight-step wedding questionnaire from EmailJS. Preserve questionnaire fields and answers, improve styling without reducing its functionality, and include noindex metadata. This URL is not access control; do not display saved customer submissions publicly.

WhatsApp uses a normal `wa.me` link with a URL-encoded message and optional event context. The user chooses whether to send. Do not include email addresses or private notes in the link. Calls use the confirmed international number consistently.

## Search, performance and measurement

Generate unique titles, descriptions, canonical URLs and social previews in initial HTML. Use one descriptive H1 per page. Include factual organization/service/breadcrumb structured data where relevant, without self-awarded review rich results. Preserve old URLs and useful anchors; use deliberate redirects only where URLs actually change. Replace SPA catch-all 200 routing with static routing and real 404 handling.

Generate the sitemap from the public content inventory. Exclude thank-you, questionnaire, drafts and ticket wireframes. Noindex all preview deployments without noindex leaking into the production build. Use truthful modification dates. Preserve `https://theledjs.ie` as the canonical host subject to confirming live host redirects during release checks.

Use responsive AVIF/WebP assets with dimensions, prioritise the hero, lazy-load below-fold photography and self-host licensed font files when possible. Avoid the staging GigBook dependency in the rebuilt site unless the owner supplies a specific production requirement. Do not add another competing floating booking widget.

Targets after launch: LCP at or below 2.5 seconds, INP at or below 200 ms and CLS at or below 0.1 at the 75th percentile of real visits. Lab checks guide development; they do not establish field results. Test 320px through desktop, keyboard navigation, visible focus, dialog behaviour, contrast, reduced motion and form error announcements.

Provide consent-aware hooks for enquiry starts, accepted enquiries, calls and WhatsApp clicks, without collecting personal fields in analytics. Leave analytics disabled until an account and consent approach are configured. Track actual quotes, confirmed bookings and booked revenue outside the public UI; do not count WhatsApp clicks as confirmed enquiries. Do not add marketing opt-ins unless marketing is actually being introduced.

## Ticketing boundary

Retain the current mock ticket interaction as a design reference. Add a separate wireframe document covering event discovery, event detail, ticket types, fees, checkout, confirmation, ticket recovery and organizer operations. Mark unresolved capacity, refunds, payments, transfers, door scanning and promoter requirements. Do not create production `/events` routes or payment endpoints in this release. Removing a navigation link alone does not meet the hidden requirement.

## Release gates

Generated HTML and actual routing pass checks; no public ticket/demo inventory exists; all services and nine counties are represented accurately; existing URLs/questionnaire remain functional; call and WhatsApp links use the confirmed number; both form payloads are persisted and validated; Resend notifications/acknowledgements/replies and recovery are tested in a controlled preview; secrets are absent from the public bundle; policies are approved; responsive and keyboard flows pass. Search Console access, DNS verification, Resend credentials and approved policy content are launch dependencies, not placeholders to misrepresent as completed.

## Primary references verified for planning

- [Astro React integration](https://docs.astro.build/en/guides/integrations-guide/react/): rendering and selective hydration.
- [Netlify form submissions](https://docs.netlify.com/manage/forms/submissions/): submission storage and owner access.
- [Netlify event functions](https://docs.netlify.com/build/functions/trigger-on-events/): verified form events and platform signature checks.
- [Resend Node.js integration](https://resend.com/docs/send-with-nodejs): verified sender domain and server credentials.

Detailed SEO evidence and supporting Google guidance remain in `docs/design-concept/proposed-review.md`.
