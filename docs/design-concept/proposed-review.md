# LEDJS: a search-to-revenue redesign

Prepared 20 October 2026 using `ui_skill.md`. Review alongside [the HTML concept](index.html).

The recommendation is to position LEDJS as the entertainment specialist people can discover locally, evaluate through real event evidence, contact quickly, and return to for public nights. Success means profitable confirmed bookings and paid attendance. A visual refresh supports that goal; searchable service pages, dependable lead handling and a usable ticket operation do most of the commercial work.


## Updated marketing direction

Wedding DJs now lead the rebuild, with full-evening and after-band options confirmed by the owner. Party and corporate DJ services follow; LED wristbands are an optional differentiator. Music bingo is branded Songo Music Bingo, with LEDJS identified as a franchisee. The legacy branded photograph has been removed from public use. See `docs/research/2026-10-20-wedding-dj-and-songo.md` and the new `wedding-dj.html` and `songo-music-bingo.html` concept pages. Ticketing remains non-public while its scope is developed.

## Evidence and limits

This is a source-code review of the current checkout. It is not a live crawl, a delivered-email test, a DNS audit or a measured ranking assessment. The public homepage could not be retrieved by the research tool. Search Console, analytics, Google Business Profile, mailbox delivery records, hosting responses and payment accounts were not available. No keyword volumes, competitor positions, conversion rates or revenue uplift are claimed.

| Finding in the source | Commercial implication | Proposed change |
| --- | --- | --- |
| `src/App.jsx` has five routes; all six services live under `/services` with section anchors | Each service lacks a dedicated landing page and distinct search snippet | Create substantive pages for each service; retain `/services` as the hub |
| `index.html` contains an empty React root; route titles/descriptions are added through Helmet | Initial content relies on JavaScript rendering; Google can render JS, but the current approach adds a dependency | Pre-render public marketing and event pages with their own metadata and content in HTML |
| No canonical, social sharing or JSON-LD markup found in the inspected source | Search and shared links lack explicit page identity and structured business/event information | Add per-page canonicals, Open Graph, social images and factual structured data |
| Footer displays `(086) 895 7442` but links to `tel:+1234567890` | Visitors can call an unrelated number | Confirm the business number and use `+353868957442` consistently if confirmed |
| EmailJS sends directly from `QuoteForm.jsx`; only name/email are required; success message disappears after five seconds | Existing integration deserves verification; date/location qualification and durable lead tracking are missing from this flow | Add minimal qualifying fields, persist enquiries before notification and retain a reference/status |
| Enquiry service choices omit karaoke and an explicit wedding option; no venue field | Enquiries can arrive with avoidable gaps | Align service choices with the catalogue and request venue/town |
| No WhatsApp link found | High-intent mobile visitors cannot choose the familiar chat channel | Add a direct, prefilled WhatsApp action and track clicks |
| No event routes, ticket checkout or order handling in the app | Public events cannot generate ticket revenue through the current app | Introduce event detail pages, checkout and an operational ticket workflow |
| Sitemap dates are all `2025-02-12`, and include the wedding questionnaire | Search signals and public URL inventory need review | Generate accurate modification dates; remove private/client-only utilities from the sitemap and apply appropriate access/noindex controls |
| Both Netlify config and `_redirects` provide a catch-all 200 rewrite | Unknown routes need live testing for soft 404 behaviour | Use one owned routing configuration and return actual 404s for unknown URLs |
| Several source photographs are approximately 1.6–2.5 MB; root HTML loads a staging GigBook widget | Image weight and third-party scripts may slow first load or compete with enquiries | Generate responsive AVIF/WebP and inspect widget ownership, environment and purpose before retaining it |

No delivery failure is inferred just from EmailJS being browser-side. The README describes integration as pending while the code already sends requests; update documentation after testing the real service.

## Brand and customer journey

Keep the energy of LED wristbands and real crowds. Replace the generic opening slogan with a large editorial headline supported by a plain statement: “Wedding DJs, parties and interactive entertainment. Based in Longford, performing across Ireland.” Confirm the actual travel footprint before publication.

The navigation separates **Entertainment** from **Events & tickets**. “Check your date” starts an enquiry and does not imply live availability. “Buy tickets” always names a specific public event. On mobile, keep a compact enquiry/WhatsApp bar with enough bottom space that it never covers page content.

Service pages should show an authentic event photograph, who the experience suits, what happens on the night, equipment/setup requirements, package inclusions, genuine price guidance if commercially approved, a relevant case study, travel information and a short enquiry form. Allow visitors to enquire without being forced to create an account.

The concept uses existing photographs and an existing testimonial. Sample ticket events and prices are illustrative and visibly marked. Do not publish invented reviews, customer totals, scarcity counters, starting prices, awards or availability promises.

## Search strategy

### Establish high-intent destinations

| Proposed URL | Intent hypothesis, to validate | Required original content |
| --- | --- | --- |
| `/wedding-dj` | Wedding DJ Longford / Midlands | Music planning, first dance, real wedding evidence, packages and enquiry |
| `/party-dj` | Birthday and private-party DJ | Party formats, music choices, venue needs and real celebrations |
| `/corporate-entertainment` | Staff party / team entertainment | Hosting, schedules, branding options and permissioned business case studies |
| `/music-bingo` | Music bingo hire Ireland | Demonstrate gameplay, audience fit, themed rounds and booking details |
| `/speed-quizzing` | Interactive quiz hire | Team sizes, equipment, scoring and sample event format |
| `/led-wristbands` | LED wristbands for events | Controlled lighting demonstration and actual service scope |
| `/karaoke` | Karaoke party hire | Hosting, song requests, equipment and setup |
| `/events` and `/events/{event-slug}` | Things to do / specific event name | Confirmed date, venue, access, ticket prices, age limits and policies |
| `/stories/{event-slug}` | Venue/service research | Permissioned photographs, location, brief, approach and verified outcome |

Start in Longford, then expand to areas genuinely served. Publish a location page only when it offers distinct venue experience, travel guidance and useful local evidence. Do not mass-generate county-swapped text. Google treats substantially similar funnel pages as potential [doorway abuse](https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse).

### Technical search foundations

Prefer a static-first rendering approach for public content, with server endpoints only where needed for leads/orders. Compare adding prerendering to Vite with migrating the public pages to Astro; choose after testing hosting compatibility and editing requirements. A full framework migration is not a prerequisite for improving the existing site.

Deliver unique HTML titles, descriptions, one descriptive H1, self-referencing canonicals, sensible internal links, accessible image descriptions and share previews on every public page. Preserve existing URLs; map any changed URL to its closest replacement with a 301. Keep the `/services` hub and useful existing section anchors. Use real 404 responses. Generate the sitemap from published canonical pages with truthful dates, and keep drafts/previews/client questionnaires out of search.

Google can process JavaScript; prerendering is a reliability and speed recommendation, not a claim that React is unindexable. See [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

Add factual `Organization` or an appropriate `LocalBusiness` type without inventing an address; include `Service` and `BreadcrumbList` where appropriate. Public event pages get `Event` and `Offer` data matching visible confirmed facts, including timezone-aware dates, venue, currency, price, availability and cancellation/postponement status. Eligibility and presentation vary by feature and country; structured data does not guarantee enhanced results. Validate with [Google's event guidance](https://developers.google.com/search/docs/appearance/structured-data/event) and Rich Results Test. FAQs should help customers; do not build a revenue forecast around FAQ rich results.

Compress and resize photographs, set image dimensions, prioritize the actual hero image, lazy-load images below the fold and avoid autoplay media. Subset/self-host chosen font files where licensing allows. Performance acceptance targets: LCP at or below 2.5 seconds, INP at or below 200 ms, CLS at or below 0.1 at the 75th percentile of real visits. These are targets to measure after launch, not scores achieved by this mockup. [Google's Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals).

### Earn local authority

Verify and complete Google Business Profile with accurate category, service areas, phone, hours, service descriptions and new event photography. Use a consistent business identity across the site, profile and relevant directories. Ask actual customers for honest reviews after events, reply to them and obtain permission for case studies. Pursue useful venue, wedding supplier and community partnerships that naturally reference LEDJS. Google's [local ranking guidance](https://support.google.com/business/answer/7091?hl=en) highlights relevance, distance and prominence; design cannot override geographic distance or guarantee a position.

Publish useful answers based on real customer conversations: wedding DJ planning, how music bingo works, fundraising entertainment logistics and venue setup. Link each guide to a relevant service and real example. Start with a small number of strong pages and refine from Search Console query data; suggested keywords above are hypotheses, not researched volume estimates.

## Email and enquiry reliability

Recommended production flow: accessible form → server validation/rate limiting → durable enquiry record with reference → queued owner notification and customer acknowledgement → delivery/bounce monitoring → human follow-up → quote → booking outcome. Persist before acknowledging receipt. If notification fails, retain the lead and alert the owner; retry safely without duplicate records. Distinguish “request received” from “booking confirmed.”

Use Resend or a comparable transactional provider behind a server endpoint. Configure verified sending DNS, SPF/DKIM and an aligned DMARC policy after checking existing records. Send from a verified business address and set Reply-To to the enquirer; do not spoof the customer's address. Keep transactional and marketing mail distinct. [Resend's domain documentation](https://resend.com/docs/dashboard/domains/introduction) describes verification and reputation separation; confirm pricing, limits and processing terms before procurement.

Required fields: name, email, event type, approximate date and town/venue; permit “date undecided.” Phone, guest count and notes can remain optional. Keep inputs on error, prevent duplicate submissions and show a persistent accessible result. Protect against spam server-side; expose fallback email, call and WhatsApp options. Store provider secrets server-side. Test malformed inputs, rate limits, provider outages, duplicate clicks, owner delivery, customer replies and bounces. Verify both the standard enquiry and wedding questionnaire templates.

The owner view should show new/unanswered enquiries, date, venue, source and status. A reminder can flag enquiries not answered within the existing 24-hour promise, if that service level remains operationally realistic. Follow-up templates should save time without implying a person has reviewed a request when they have not.

Provide a clear privacy notice, retention policy and a separate unticked marketing opt-in if marketing is introduced. Agree retention and data-processing terms with the business before launch. This proposal does not assess current legal compliance.

## Direct WhatsApp enquiries

Use an ordinary link to `https://wa.me/353868957442?text=...`, based on the currently displayed number, **after verifying that it is owned by the business and enabled for WhatsApp**. The concept previews that link and the message; it never sends a message automatically. Include only the event context the visitor chooses to share. Do not place their email or sensitive notes into a URL by default.

Place WhatsApp beside the short enquiry form and in the mobile action bar. It opens a conversation, not a reservation; avoid “online now” or guaranteed instant replies without staffing. Link-click analytics measures intent, not an actual conversation or booking. Reconcile actual chat outcomes manually or through an approved business integration later. Follow [WhatsApp's click-to-chat guidance](https://faq.whatsapp.com/5913398998672934).

## Events and tickets

Launch a branded event discovery and detail experience. For an initial small programme, a managed ticket platform can reduce operating work; compare platform fees, payouts, buyer experience, exports and scanning. For greater control, use hosted Stripe Checkout with an event/order backend. A static payment link by itself is not a complete capacity-managed ticket system. Recommended choice depends on expected event volume and who will run the door.

Every event needs a permanent shareable page with a real title, schedule in Europe/Dublin, confirmed venue/address, accessible travel information, age/access restrictions, performer details, ticket inclusions, all mandatory fees before payment, organizer contact and refund/cancellation terms. Show sold out, cancelled and postponed states honestly; retain useful past event pages with their actual status and links to future events.

The HTML demonstrates ticket quantities and an order summary only. Production checkout must reserve capacity atomically with expiring holds, calculate trusted prices on the server and prevent overselling across buyers. A pending/unpaid order does not grant entry. Use hosted checkout to collect payment details; enable available wallet methods in the provider account after testing them.

Use a verified, idempotent payment webhook to transition a paid order once. Handle delayed payment success/failure, retries and out-of-order events. Issue unique ticket identifiers/QRs only after confirmed payment; send receipt and ticket emails, support resend and a retrieval path when email is delayed. Never fulfil solely because the browser reaches a success page. Stripe describes this in its [fulfilment documentation](https://docs.stripe.com/checkout/fulfillment).

Provide an authenticated organizer view for capacity, paid/refunded/failed orders, attendee lookup and scanning. A QR is a lookup token, not exposed customer data. Mark a ticket used atomically and warn on repeat entry. Define refund revocation, transfers, complimentary tickets, cancellation communications, guest checkout, lost tickets, door connectivity contingency and reconciliation. Track event revenue net of refunds and fees, not just gross checkout value. Confirm tax treatment and publish commercially approved policies before taking money.

## Measurement tied to revenue

Baseline the previous comparable period before launch. Track Search Console non-brand clicks, relevant query visibility and landing-page performance. With appropriate consent, track `enquiry_start`, server-confirmed `enquiry_received`, `whatsapp_click`, `call_click`, `event_view`, `checkout_started` and server-confirmed `ticket_paid`. Do not send names, emails or message text to analytics. Deduplicate transactions by order ID.

Join enquiries to quote and booking outcomes in the business workflow. Report qualified lead rate, time to reply, quote-to-booking rate, booked revenue, ticket conversion and event contribution margin. WhatsApp clicks and form starts are leading indicators, not revenue. Set numeric business uplift targets after observing a trustworthy baseline. Compare month-on-month and year-on-year when seasonality permits.

## Delivery sequence

| Phase | Deliverable | Release gate |
| --- | --- | --- |
| Foundation | Confirm identity/phone, analytics baseline, crawl and index audit; fix contact mismatch; verify existing email; remove inappropriate staging dependencies | Calls reach the owner; test enquiries and replies work; canonical domain and inventory agreed |
| Enquiries and core services | Approved visual system, searchable service pages, shorter durable enquiry flow and WhatsApp | Mobile and keyboard flows pass; content approval; lead retention/outage tests; initial HTML and real status codes verified |
| Ticket pilot | One real event, policies, trusted checkout, payment webhook, ticket email and door process | Sandbox payment/refund/duplicate webhook/capacity race tests; email retrieval and duplicate scan checks; full rehearsal |
| Authority and iteration | Real event stories, venue partnerships, profile maintenance and content based on actual queries | Monthly booked-revenue review; refine pages with impressions but weak clicks or enquiries |

Indicative effort must be estimated after the audit and provider choices. Publish in stages to learn from real enquiries rather than delay all improvement behind ticketing.

## Concept walkthrough and outstanding decisions

Open `index.html` in a browser. Use the event/date strip to prefill an enquiry, explore all six services, choose sample ticket quantities, preview the email confirmation and open the WhatsApp message preview. The review link in the concept opens this document. No personal information is stored or sent by the simulated form, and no payment is taken.

Before production: confirm the WhatsApp number, primary target counties, actual event programme/prices, approved service inclusions, photo/testimonial permissions, the owner's enquiry workflow, ticket operator and refund approach. Obtain Search Console/analytics/DNS/provider access through appropriate secure channels. The goal is stronger search coverage and more attributable sales; rankings and market leadership remain outcomes to earn and measure.
