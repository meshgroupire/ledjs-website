import test from 'node:test';
import assert from 'node:assert/strict';
import {postForm} from '../src/lib/form-client.mjs';
test('URL encodes user text and never treats a failed request as receipt',async()=>{
  const fields={name:"O'Connor & friends",notes:'line one\nline two <song>',reference:'same-reference'};
  let captured;
  await assert.rejects(()=>postForm(fields,async(url,options)=>{captured={url,options};return{ok:false};}));
  assert.equal(captured.url,'/__forms.html');
  assert.deepEqual(Object.fromEntries(new URLSearchParams(captured.options.body)),fields);
  await assert.doesNotReject(()=>postForm(fields,async()=>({ok:true})));
  assert.equal(fields.reference,'same-reference');
});
