# Enquiry and Resend operation

The browser posts to Netlify Forms. The platform retains the submission and invokes the signed `formSubmitted` handler for verified forms. The handler validates fields and sends two independent messages through Resend. No public arbitrary-recipient endpoint exists. Reference IDs identify correspondence; they do not authenticate anyone.

## Activation, deferred to issue 7

Keep `PUBLIC_FORMS_ENABLED=false` until policies, form detection and controlled delivery checks are complete. This switch is browser-visible and not a security boundary; server validation and signed platform events remain required. With the switch false, the interface offers direct email, telephone and WhatsApp instead of pretending to submit.

Enable Netlify form detection, confirm account entitlement/usage, then deploy the static HTML. Check that `ledjs-enquiry` and `ledjs-wedding-questionnaire` are registered. The questionnaire registration skeleton is `/__forms.html`; it contains only field definitions, never saved submissions.

Set server variables in Netlify **Functions** scope: `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (verified domain), `ENQUIRY_TO_EMAIL`. Never use a `PUBLIC_`/`VITE_` prefix for these values. Verify sending-domain DNS in Resend and confirm the existing mailbox's SPF/DKIM/DMARC setup before making DNS changes.

For preview testing, set `EMAIL_DELIVERY_MODE=test` and `RESEND_TEST_RECIPIENT` to a controlled mailbox. Both owner and customer messages go to that mailbox. Production mode also requires runtime `CONTEXT=production`; verify this value is available in Functions scope. Set delivery mode/context only in the intended deploy context, not account-wide. Missing values fail closed while the form record remains in Netlify.

Test a general enquiry and all eight questionnaire steps, including multiline text and an apostrophe. Confirm submission storage, owner notification, customer acknowledgement and Reply-To routing. Check spam classification and retention/export controls. Test a deliberate provider outage and its recovery before enabling production collection.

## Delivery failures

An accepted form and delivered email are different events. Look in Netlify Forms for the enquiry reference even if no notification arrived. Check Functions logs (reference, message kind and allowlisted provider status/code only) and Resend delivery/bounce logs. Do not copy raw questionnaire answers into logs or GitHub issues. Provider acceptance is not proof of inbox delivery.

Resend's [idempotency documentation](https://resend.com/docs/dashboard/emails/idempotency-keys) currently describes a 24-hour window. Owner/customer messages have distinct stable keys derived from the reference and validated payload. A retry inside that window must use exactly the same validated payload and configuration. Do not assume an event function is a durable retry queue.

For manual recovery, export the stored submission securely outside the repository and reconstruct its original field dictionary. In a trusted operator session, call `parseSubmission` (structural validation remains stable after the event date) followed by `sendNotifications` using the configured Resend SDK. The functions are exported from `netlify/lib/`; no recovery HTTP endpoint is exposed. Within the idempotency window, replay uses the original keys. Outside it, first reconcile which messages were accepted in provider logs, then send only the missing message through the provider dashboard or an operator-controlled process. Never blindly replay both after the window. Delete temporary exports according to the approved retention policy.

## Privacy and maintenance

Approve retention periods, processing terms and customer-facing privacy copy before activation. Restrict owner access to Forms exports and provider dashboards. Schedule review of unanswered enquiries and failed/bounced messages. This release does not create a CRM, marketing subscription or automatic booking confirmation.
