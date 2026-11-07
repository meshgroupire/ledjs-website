import { createHash } from 'node:crypto';
import { renderOwnerEmail, renderAcknowledgement } from './email-templates.mjs';
export async function sendNotifications(payload,{send,config,log=console.error}) {
  if(!config.from || !config.owner || /[\r\n]/.test(config.from+config.owner) || !['production','test'].includes(config.mode)) throw new Error('Email delivery is not configured');
  if(config.mode==='production' && config.context!=='production') throw new Error('Production email is blocked outside production');
  if(config.mode==='test' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.testRecipient||'')) throw new Error('A test recipient is required');
  const hash=createHash('sha256').update(JSON.stringify(payload)).digest('hex').slice(0,40);
  const key=`ledjs/${config.mode}/${payload.reference}/${hash}`;
  const messages=[
    {kind:'owner',to:config.mode==='test'?config.testRecipient:config.owner,replyTo:payload.email,...renderOwnerEmail(payload)},
    {kind:'customer',to:config.mode==='test'?config.testRecipient:payload.email,replyTo:config.owner,...renderAcknowledgement(payload)},
  ];
  const results=await Promise.allSettled(messages.map(async({kind,...mail})=>{
    try {
      const response=await send({...mail,from:config.from},{idempotencyKey:`${key}/${kind}`});
      if(response.error || !response.data?.id) throw response.error || {};
      return {kind,id:response.data.id};
    } catch (error) {
      const safe = value => typeof value === 'string' && /^[a-zA-Z0-9_-]{1,60}$/.test(value) ? value : undefined;
      log('LEDJS notification failed',{reference:payload.reference,kind,code:safe(error?.name),status:Number.isInteger(error?.statusCode)?error.statusCode:undefined});
      throw new Error(`${kind} notification failed`);
    }
  }));
  if(results.some(r=>r.status==='rejected')) throw new Error(`Email notification incomplete for ${payload.reference}; recover the stored submission and check provider logs`);
  return results.map(r=>r.value);
}
