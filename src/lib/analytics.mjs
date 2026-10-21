const events=new Set(['enquiry_start','enquiry_received','call_click','whatsapp_click']);
const keys=['service','county','sourcePath'];
export function trackIntent(name,properties={},integration={}) {
  if(!events.has(name)||integration.consent!==true||typeof integration.provider!=='function') return;
  const clean={};
  for(const key of keys) {
    const value=properties[key];
    if(typeof value==='string' && value.length<=150 && !/[?@\r\n]/.test(value)) clean[key]=value;
  }
  try{integration.provider(name,clean);}catch{/* Measurement never blocks the enquiry journey. */}
}
