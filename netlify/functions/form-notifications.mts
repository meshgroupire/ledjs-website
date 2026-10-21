import type { FormSubmittedEvent } from '@netlify/functions';
import { Resend } from 'resend';
import { parseSubmission } from '../lib/enquiry-schema.mjs';
import { sendNotifications } from '../lib/send-notifications.mjs';

// The platform verifies the event signature. This is not a public mail endpoint.
export default {
  async formSubmitted(event: FormSubmittedEvent) {
    const formName=event.data.formKind || event.data['form-name'];
    if(!['ledjs-enquiry','ledjs-wedding-questionnaire'].includes(formName)) return;
    const payload=parseSubmission({...event.data,'form-name':formName});
    const get=(key: string)=>Netlify.env.get(key);
    const key=get('RESEND_API_KEY');
    if(!key) throw new Error(`Resend not configured; stored enquiry ${payload.reference} requires follow-up`);
    const resend=new Resend(key);
    await sendNotifications(payload,{
      send:resend.emails.send.bind(resend.emails),
      config:{from:get('RESEND_FROM_EMAIL'),owner:get('ENQUIRY_TO_EMAIL')||'dave@theledjs.ie',mode:get('EMAIL_DELIVERY_MODE')||'disabled',context:get('CONTEXT')||'unknown',testRecipient:get('RESEND_TEST_RECIPIENT')},
    });
    console.info('LEDJS notifications accepted', {reference:payload.reference});
  },
};
