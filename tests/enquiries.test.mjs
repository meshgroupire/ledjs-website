import test from 'node:test';
import assert from 'node:assert/strict';
import { parseSubmission } from '../netlify/lib/enquiry-schema.mjs';
import { renderOwnerEmail } from '../netlify/lib/email-templates.mjs';
import { sendNotifications } from '../netlify/lib/send-notifications.mjs';
import { counties } from '../src/config/business.mjs';
import { questionnaireFields } from '../src/lib/questionnaire-fields.mjs';
const enquiry = { 'form-name':'ledjs-enquiry',reference:'LEDJS-2a1e4e81-0e54-497e-9001-123456789abc',name:'Test Guest',email:'guest@example.com',occasion:'Wedding',county:'Longford',venue:'Example venue',service:'Wedding DJs',eventDate:'2027-06-12',notes:'Hello <script>alert(1)</script>' };
const config = { mode:'production',context:'production',from:'LEDJS <enquiries@example.com>',owner:'owner@example.com' };
test('validates each target county and rejects malformed or oversized inputs',()=>{
  for(const county of counties) assert.equal(parseSubmission({...enquiry,county}).county,county);
  for(const change of [{email:'bad'}, {email:'a@b.com\r\nBcc:x@y.com'}, {county:'Atlantis'}, {venue:''}, {eventDate:'2027-02-30'}, {notes:'a'.repeat(3001)}, {guests:'0'}, {'form-name':'unknown'}]) assert.throws(()=>parseSubmission({...enquiry,...change}));
});
test('escapes HTML while preserving useful plain text',()=>{
  const email=renderOwnerEmail(parseSubmission(enquiry));
  assert(!email.html.includes('<script>')); assert(email.html.includes('&lt;script&gt;'));assert(email.text.includes('<script>'));
});
test('preserves all questionnaire fields and rejects unexpected fields',()=>{
  const answers=Object.fromEntries(questionnaireFields.map(k=>[k,['priorities','traditions','mcStyle','interactive','addons'].includes(k)?[]:'']));
  Object.assign(answers,{brideName:"A & B",groomName:'C',email:'couple@example.com',phone:'086 0000000',weddingDate:'2027-06-12',guestCount:'100',venueName:'Example',venueAddress:'Longford',receptionStart:'19:00',receptionEnd:'01:00',introStyle:'The couple',firstDanceSong:'To be confirmed',mustPlaySongs:'First line\nSecond line <b>song</b>'});
  const q={'form-name':'ledjs-wedding-questionnaire',reference:enquiry.reference,name:'A & B and C',email:answers.email,phone:answers.phone,answers:JSON.stringify(answers)};
  const parsed=parseSubmission(q);assert.deepEqual(Object.keys(parsed.answers),questionnaireFields);assert.equal(parsed.answers.mustPlaySongs,answers.mustPlaySongs);
  assert.throws(()=>parseSubmission({...q,answers:JSON.stringify({...answers,unexpected:'injection'})}));
});
test('partial provider failure preserves stable independent idempotency on retry',async()=>{
  const calls=[];let fail=true;
  const send=async(mail,options)=>{calls.push({mail,key:options.idempotencyKey});if(mail.to==='guest@example.com'&&fail)return {error:{message:'temporary'}};return {data:{id:'fake'}};};
  const payload=parseSubmission(enquiry);
  await assert.rejects(()=>sendNotifications(payload,{send,config}));
  fail=false;await sendNotifications(payload,{send,config});
  assert.equal(calls.length,4);assert.equal(calls[0].key,calls[2].key);assert.equal(calls[1].key,calls[3].key);assert.notEqual(calls[0].key,calls[1].key);
  assert.equal(calls[0].mail.replyTo,'guest@example.com');
});
test('missing config and preview delivery fail closed without real recipients',async()=>{
  let calls=0;const send=async()=>{calls++;return{data:{id:'fake'}};};const payload=parseSubmission(enquiry);
  await assert.rejects(()=>sendNotifications(payload,{send,config:{...config,from:''}}));
  await assert.rejects(()=>sendNotifications(payload,{send,config:{...config,context:'deploy-preview'}}));
  await assert.rejects(()=>sendNotifications(payload,{send,config:{...config,mode:'test'}}));
  assert.equal(calls,0);
  const recipients=[];await sendNotifications(payload,{send:async m=>{recipients.push(m.to);return{data:{id:'fake'}};},config:{...config,mode:'test',context:'deploy-preview',testRecipient:'sink@example.com'}});
  assert.deepEqual(recipients,['sink@example.com','sink@example.com']);
});

test('questionnaire requires planning details and structural types',()=>{
 const answers=Object.fromEntries(questionnaireFields.map(k=>[k,['priorities','traditions','mcStyle','interactive','addons'].includes(k)?[]:'']));
 Object.assign(answers,{brideName:'A',groomName:'B',email:'guest@example.com',phone:'086',weddingDate:'2027-06-12',guestCount:'100',venueName:'Venue',venueAddress:'Address',receptionStart:'19:00',receptionEnd:'01:00',introStyle:'Couple',firstDanceSong:'TBC'});
 const parse=a=>parseSubmission({'form-name':'ledjs-wedding-questionnaire',reference:enquiry.reference,name:'A & B',email:answers.email,answers:JSON.stringify(a)});
 assert.doesNotThrow(()=>parse(answers));
 for(const key of ['weddingDate','guestCount','venueName','venueAddress','receptionStart','receptionEnd','introStyle','firstDanceSong']) assert.throws(()=>parse({...answers,[key]:''}),key);
 for(const change of [{weddingDate:'2027-02-30'},{guestCount:'1.5'},{receptionStart:'25:00'},{venueName:[]},{priorities:'wrong'}]) assert.throws(()=>parse({...answers,...change}));
});
test('stored enquiries remain structurally valid after their event date',()=>{
 assert.equal(parseSubmission({...enquiry,eventDate:'2000-01-01'}).eventDate,'2000-01-01');
});

test('failure diagnostics identify message kind without provider text or personal data',async()=>{
 for(const failed of ['owner@example.com','guest@example.com']) {
  const logs=[];
  await assert.rejects(()=>sendNotifications(parseSubmission(enquiry),{config,log:(...args)=>logs.push(args),send:async mail=>mail.to===failed?{error:{name:'rate_limit_exceeded',statusCode:429,message:'private guest@example.com'}}:{data:{id:'fake'}}}));
  assert.equal(logs[0][1].kind,failed.startsWith('owner')?'owner':'customer');
  assert.equal(logs[0][1].status,429);assert(!JSON.stringify(logs).includes('@'));
 }
});
