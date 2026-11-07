# Design direction · 20 October 2026

Prepared using the repository's `ui_skill.md` and the brainstorming workflow. This artifact is the proposed design for review, not production implementation.

## Brief and boundaries

LEDJS is a Longford-based entertainment business offering wedding and party DJs, LED wristbands, music bingo, speed quizzing and karaoke. The commercial aim is more qualified enquiries and an additional revenue stream from public events. The requested deliverable is a review and HTML mockup; production integrations, payment collection and deployment are outside this concept.

## Approaches considered

| Approach | Benefit | Tradeoff |
| --- | --- | --- |
| Booking-led brochure refresh | Smallest delivery scope | Leaves repeat event revenue underdeveloped |
| Entertainment brand with two clear journeys — recommended | Strong private booking proposition plus public event discovery | Needs disciplined separation of enquiries and checkout |
| Full entertainment marketplace | Broader inventory and promoters | Operational complexity distracts from selling LEDJS's own services |

## Tokens

- Stage indigo `#17153D`: navigation, photographic framing and footer.
- Paper white `#FFFFFF`: breathing space and form backgrounds.
- Mist blue `#EEF3FA`: secondary sections and practical information.
- Raspberry `#BA1756`: primary actions with white text.
- Signal cyan `#76E3ED`: large display text and restrained emphasis on dark backgrounds.
- Ink `#24243A`: body copy on light surfaces.

Barlow Condensed bold carries the energy of a live event poster; Manrope is the quiet, readable interface face. Both have system fallbacks. No animated background, autoplay video or invented performance counters.

## Layout

Left-aligned navigation and a large, asymmetric photo-led hero. Put the crowd in the foreground of the story. A useful date-and-event enquiry strip sits directly below it. Use different compositions for different jobs: photographic service panels, a plain event listing, one testimonial and a spacious enquiry form.

```text
Logo                   Services / Events / About        Check your date
┌─────────────────────────────────────────────────────────────────────┐
│ Clear service + location      Existing crowd photograph             │
│ Giant event-poster headline                                         │
│ Enquire / Find an event                                             │
└─────────────────────────────────────────────────────────────────────┘
 Event type                    Date                     Start enquiry
 Weddings photo       Parties photo       Interactive entertainment
 Featured LED wristband story + existing testimonial
 Public event listing + ticket selection dialog
 Named host and location + short enquiry form / WhatsApp
 FAQs, contact and mobile action bar
```

## Critique before building

A dark neon page alone would repeat the obvious nightclub template and the current site. Revised direction: keep the brand's cyan and pink family, but put service discovery and enquiries on light surfaces. Avoid repeated gradient cards, carousels hiding core services, arbitrary numbered sections and unsupported star ratings. The one bold element is poster-scale typography over authentic crowd imagery. Event rows and ticket details prioritise clarity over decoration.

## Review criteria

The first screen must identify the service and location, then expose booking and ticket paths. All six current services must remain discoverable. The mock must work with a keyboard, fit mobile screens, label form fields, respect reduced motion, and make simulated transactions explicit. Sample event facts must never be mistaken for live inventory.
