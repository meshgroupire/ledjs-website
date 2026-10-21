import test from 'node:test';
import assert from 'node:assert/strict';
import { trackIntent } from '../src/lib/analytics.mjs';
test('does nothing without consent and an installed provider',()=>{
  let called=false;trackIntent('whatsapp_click',{sourcePath:'/contact'},{consent:false,provider:()=>{called=true;}});assert.equal(called,false);
  assert.doesNotThrow(()=>trackIntent('whatsapp_click',{sourcePath:'/contact'}));
});
test('only allowlisted non-personal event data reaches the provider',()=>{
  let captured;trackIntent('call_click',{sourcePath:'/contact',email:'private@example.com',notes:'secret'},{consent:true,provider:(...args)=>{captured=args;}});
  assert.deepEqual(captured,['call_click',{sourcePath:'/contact'}]);
  captured=undefined;trackIntent('unknown',{}, {consent:true,provider:()=>{captured=true;}});assert.equal(captured,undefined);
});
