# Wedding-first positioning and Songo research

Researched 20 October 2026. This updates the rebuild specification and implementation plan; earlier entertainment-first or wristband-led treatments are superseded.

## Confirmed commercial hierarchy

Lead with wedding DJs, specifically full-evening DJ entertainment and after-band sets, both confirmed by the owner. Party and corporate DJ work follow. LED wristbands differentiate the wedding/DJ offer rather than define the business. Songo Music Bingo, speed quizzing and karaoke remain secondary services with their own useful pages.

The owner confirms LEDJS is a Songo franchisee and has an approved Songo asset pack. The pack has not been provided in this workspace. Use the official unmodified wordmark temporarily, then replace it with the supplied assets as appropriate. Do not claim an exclusive county territory or imply LEDJS is the Songo national operator.

## Primary-source research

| Source | Observation | LEDJS decision |
| --- | --- | --- |
| [Aidan Kavanagh wedding DJ page](https://aidankavanagh.com/wedding-dj/) | Explains personal music planning and DJ-only receptions | Give full-evening entertainment a substantive explanation; distinguish music planning from a stock playlist |
| [STAR DJs wedding service](https://stardjs.ie/our-services/weddings/) | Separates full-night and after-band packages; answers equipment and price questions | Compare the two owner-confirmed formats and explain quote factors; do not import its rates, durations or guarantees |
| [Wedding DJ Ireland](https://www.weddingdjireland.ie/) | Makes the host, package choices, music and reviews prominent | Show Dave, the planning process and genuine wedding evidence near the enquiry action |
| [Songo homepage](https://songo.ie/) | Positions the brand for fundraising, corporate, family and festival events | Clearly label the franchise relationship, keeping LEDJS as the local enquiry contact |
| [Songo event information](https://songo.ie/info/) | Explains song-title cards, screen support, standard event format and organiser responsibilities | Explain the game in original language; confirm timings, prizes and venue setup in each quote |

Some wedding sources blocked a full live fetch; the observations above use their indexed page excerpts where necessary. The research is a small content comparison, not a verified ranking, traffic or conversion audit. Search positions vary; appearance in these results is not proof a site's design caused its position.

## Wedding page structure

Canonical destination: `/services/wedding-dj`, consistent with the implementation plan. Keep the existing `/services#wedding-djs` section useful and link it to the new page. Do not create a second competing `/wedding-dj` page.

Title: **Wedding DJ Longford & the Midlands | LEDJS**.

Description: **Full-evening wedding DJs and after-band sets from Longford. Plan your music with LEDJS and add synchronised LED wristbands. Enquire about your date.**

H1: **Wedding DJs for your kind of night.**

Page progression: clear location/service introduction; two formats; personal music planning; sound/lighting/MC inclusions from the existing service; optional wristband enhancement; real wedding photographs and permissioned testimony; named host; service coverage; pricing factors; FAQs; short date/venue enquiry. Preserve the user's music-led tone, rather than adopting generic “best DJ” claims.

The primary action is **Check your wedding date**, with **Message Dave on WhatsApp** as the alternative. A click starts an enquiry, never claims live availability. Wristband content follows the core wedding service, with a separate link for readers interested in the enhancement.

Write practical FAQs about full-evening versus after-band entertainment, must-plays/do-not-plays, first dance, equipment, travel, quotes and the booking process. Confirm any details the existing service and questionnaire do not establish. Do not add ceremony packages, saxophonists, backup-DJ guarantees, insurance claims or price promises just because a competitor lists them.

## Search intent and original evidence

Primary intent: wedding DJ Longford. Supporting intent: wedding DJ Midlands, full-evening wedding DJ, DJ-only wedding entertainment and after-band wedding DJ. Include the nine target counties naturally in coverage information. Make distinct local pages only when there is useful original evidence, not a nine-county repetition of this page.

Use the homepage to introduce the wedding-led business and the wedding service page to answer the detailed buying questions. Internal links should name their destination, for example “full-evening wedding DJ” or “wedding music planning”. Share actual event stories where permission exists; record venue, service delivered, the couple's music brief and authentic photos. Do not invent named venue experience or reuse competitors' reviews.

Build the page in static HTML with unique metadata and factual service/breadcrumb markup; provide suitable image dimensions and responsive formats. FAQs are for helping couples, not a promise of rich results. Ask for a genuine review after the event, maintain the business profile and evaluate non-brand queries, accepted enquiries and confirmed booking revenue over time.

Google's [helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) favours useful original information and first-hand expertise. The opportunity is to answer the couple's real questions and demonstrate LEDJS's own work. No ranking or revenue outcome is guaranteed by matching competitors' topics.

## Songo implementation decisions

Use the service heading **Songo Music Bingo**, with **LEDJS · Songo franchisee** as the relationship statement. Retain `/services/music-bingo` as the generic search-intent URL; preserve the existing music-bingo hub anchor. Link to official Songo information in the dedicated page. Enquiries stay with Dave and the confirmed LEDJS contact details.

Explain the basic song-recognition game, then cover planning a fundraiser, staff event or venue night. Songo's published standard format includes four rounds and a DJ set; treat that as a reference format and confirm each LEDJS booking's timings, costs, equipment and prize arrangements. The official site also has a booker/ticket route: assess whether to use that for Songo events during the later ticketing scope instead of building a duplicate. Do not introduce a public ticket action yet.

Keep national Songo testimonials, client logos and outcomes attributed to their actual source; do not present them as LEDJS customer proof. Do not mirror national pricing or additional equipment charges as LEDJS terms. Describe fundraising as an event use case without promising a financial return.

## Image and brand audit

`public/images/services/music-bingo.jpg` was visually inspected. The laptop and rear display show the legacy Smile brand. This is not detectable by a text-only source search. Remove the image from the public asset tree, references and fresh build output; do not crop or relabel it as Songo. Existing historical Git versions need not be rewritten.

The remaining service photograph contact sheet is a starting inventory, not a guarantee that every distant screen is brand-free. Check full-size photographs before reuse. Use the official Songo wordmark on a plain background until the owner's approved pack is available. A textual label does not turn an old event photograph into a Songo event.

Official wordmark source: `https://songo.ie/wp-content/uploads/2025/10/SONGO-Logo-final-275-x-63-px-1.png`, discovered on the official homepage. Keep its proportions and colours. Store it locally so the website does not rely on hotlinking. Record provenance in `docs/research/songo-asset-provenance.md`.

## Acceptance additions

Homepage opening and primary action are wedding-specific; wedding/party/corporate DJ content precedes secondary entertainment. The wedding page distinguishes the two confirmed formats and introduces wristbands as an enhancement. Songo service and franchise identity are explicit. No legacy image or Smile brand is publicly referenced or emitted. Both dedicated pages are linked, unique and part of the generated public inventory when the static rebuild is implemented. Ticketing remains non-public.
