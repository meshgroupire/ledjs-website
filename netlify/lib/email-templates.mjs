const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function renderOwnerEmail(payload) {
  const fields=payload.answers ? {...payload,...payload.answers} : payload;
  const rows=Object.entries(fields).filter(([key])=>key!=='answers');
  const text=rows.map(([key,value])=>`${key}: ${Array.isArray(value)?value.join(', '):value}`).join('\n');
  return { subject:`LEDJS enquiry ${payload.reference}`, text,
    html:`<h1>New LEDJS ${payload.answers?'wedding questionnaire':'enquiry'}</h1><table>${rows.map(([key,value])=>`<tr><th style="text-align:left;vertical-align:top;padding:8px">${escape(key)}</th><td style="white-space:pre-wrap;padding:8px">${escape(Array.isArray(value)?value.join(', '):value)}</td></tr>`).join('')}</table>` };
}
export function renderAcknowledgement(payload) {
  const summary=payload.answers?'your wedding planning information':`${payload.occasion.toLowerCase()} enquiry${payload.eventDate?' for '+payload.eventDate:''} at ${payload.venue}`;
  const text=`Hi ${payload.name},\n\nThanks for sharing ${summary}. Your reference is ${payload.reference}. Dave will review your details and get back to you. This message does not reserve a date or confirm a booking.\n\nReply to this email if you need to add anything.\nLEDJS\ndave@theledjs.ie\n086 895 7442`;
  return {subject:`Your LEDJS enquiry ${payload.reference}`,text,html:`<div style="font-family:Arial,sans-serif;line-height:1.8;max-width:600px"><h1>Thanks for the hello.</h1><p>${escape(text).replace(/\n/g,'<br>')}</p></div>`};
}
