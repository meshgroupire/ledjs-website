# Concept verification · 20 October 2026

Verified with installed headless Chrome in an isolated temporary profile. The normal browser automation service could not initialize; the headless browser completed the checks instead.

- Inline JavaScript parses; all internal section links resolve; one H1 and unique element IDs.
- Every referenced local photograph exists and decodes successfully. Below-fold photographs are intentionally lazy-loaded; full-page screenshot capture requests those images explicitly.
- Desktop at 1440px and mobile at 390px/320px have no horizontal document overflow.
- Mobile navigation opens, exposes its expanded state and closes after a navigation choice.
- Three €15 sample tickets total €45; opening the €20 event resets the quantity and amount.
- Checkout preview displays the simulated next step without creating an order or collecting payment.
- Quick enquiry and service selection prefill the relevant form fields.
- Required empty form fields block submission; a complete sample enquiry displays the preview confirmation.
- Confirmation email preview includes the supplied sample name and event summary.
- WhatsApp preview constructs the international-format number and URL-encoded event context. No message was sent.
- No JavaScript runtime exceptions during the checked flows.
- Desktop and mobile full-page screenshots captured and visually inspected.

The mock has no build step. The accompanying wedding-first and Songo content corrections in the React app passed `npm run build`. Existing CSS import-order and Browserslist-age warnings were also present in the baseline build; they are not regressions introduced by this content pass.

The two new service-page concepts were checked at 320px and desktop, with one H1, loaded imagery and valid local links. The built React homepage and service page were also checked in Chrome: wedding-led opening/title, Songo franchise attribution, official wordmark, official information link, and exclusion of the rejected photograph. A fresh source/public/build audit found no legacy brand strings or image references. Third-party legacy widget behaviour was not certified by this content pass.

These checks do not establish live email delivery, real payment processing, search indexing, Core Web Vitals performance or full assistive-technology compliance. The prototype is intentionally noindex. Fonts require access to Google Fonts; system fallbacks are provided. The wider static-site rebuild and Resend migration remain tracked separately in the implementation plan.
