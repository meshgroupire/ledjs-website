# Ticketing: non-public wireframes

This document is not a product route or a commitment to a payment provider. Nothing in this scope is emitted to the static website.

## Attendee journey

Event list (date, place, complete price, access) → event detail (real venue, schedule, age/access rules, organizer, cancellation policy) → ticket selection (types, quantities, full fees) → capacity hold → hosted checkout → payment-pending/confirmed outcome → receipt and unique entry tickets → secure retrieval/resend.

Each stage needs loading, failure, sold-out, expired-hold, cancellation and postponement states. Reaching a success URL is not payment confirmation. A verified idempotent payment event must control fulfilment. Guest checkout should be possible without a permanent account.

## Organizer journey

Authenticated event management → capacity/price inventory → paid/pending/refunded order lookup → attendee exports with access controls → ticket resend/refund/transfer → door scanning with atomic first-use recording and a repeat-entry warning → reconciliation and net revenue reporting.

Plan for poor venue connectivity, lost email, duplicate webhooks, chargebacks, complimentary tickets, cancellations, refunded-ticket revocation, accessibility enquiries and a recoverable door list. Do not put personal details in QR contents.

## Songo-specific decision

The official [Songo event information](https://songo.ie/info/) describes an existing organizer/ticket route. Establish which obligations and capabilities apply to this franchise before choosing a separate system. Avoid duplicating ticket inventory or sending a buyer between conflicting payment flows.

## Human scope decisions for the next phase

Confirm event volume, promoters versus LEDJS-only events, provider/payout ownership, ticket types, group offers, capacity rules, taxes/fees, refunds/transfers, scanning staff, offline contingency and support ownership. No public `/events` page or checkout endpoint will be enabled merely by changing a navigation flag.
