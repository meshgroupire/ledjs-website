const fs=require('node:fs');
const path=require('node:path');
const os=require('node:os');
const {spawn}=require('node:child_process');
const base=process.env.LEDJS_PREVIEW_URL || 'http://127.0.0.1:4321';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  const output=path.resolve('docs/verification');fs.mkdirSync(output,{recursive:true});
  const profile=fs.mkdtempSync(path.join(os.tmpdir(),'ledjs-rebuild-qa-'));
  const browser=spawn(process.env.CONCEPT_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{windowsHide:true,stdio:'ignore'});
  let ws;
  try{
    const portfile=path.join(profile,'DevToolsActivePort');for(let i=0;i<100&&!fs.existsSync(portfile);i++)await sleep(100);
    const port=fs.readFileSync(portfile,'utf8').split('\n')[0];
    const targets=await(await fetch('http://127.0.0.1:'+port+'/json')).json();
    ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
    await new Promise((r,j)=>{ws.addEventListener('open',r,{once:true});ws.addEventListener('error',j,{once:true});});
    let seq=0;const pending=new Map();const errors=[];
    ws.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(new Error(m.error.message)):p.resolve(m.result);}});
    const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
    const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
    const assert=(condition,message)=>{if(!condition)throw new Error('FAIL: '+message);console.log('PASS: '+message);};
    const viewport=width=>send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});
    const navigate=async route=>{await send('Page.navigate',{url:base+route});for(let i=0;i<100;i++){if(await evaluate('document.readyState==="complete"'))break;await sleep(50);}await evaluate('document.fonts.ready');await sleep(60);};
    const screenshot=async name=>{await evaluate('Promise.all([...document.images].map(i=>{i.loading="eager";return i.decode()}))');const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});fs.writeFileSync(path.join(output,name+'.png'),Buffer.from(r.data,'base64'));};
    await send('Page.enable');await send('Runtime.enable');await viewport(1440);await navigate('/');
    assert(await evaluate('document.querySelector("h1").textContent.includes("Your wedding")'),'weddings lead the homepage');
    assert(await evaluate('!document.querySelector("astro-island")'),'marketing homepage requires no React hydration');
    await screenshot('home-desktop');
    for(const width of [320,390,768,1440]){
      await viewport(width);
      for(const route of ['/','/services','/services/wedding-dj','/services/music-bingo','/contact','/service-areas']){
        await navigate(route);assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'),`${route} fits ${width}px`);
      }
    }
    await viewport(390);await navigate('/');await screenshot('home-mobile');
    await evaluate('document.querySelector(".menu-toggle").click()');
    assert(await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")==="true"'),'mobile menu opens');
    await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});
    assert(await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")==="false"'),'Escape closes mobile menu');
    await navigate('/');
    const weddingHref=await evaluate('document.querySelector(".hero-actions .button").getAttribute("href")');
    await navigate(weddingHref);
    assert(await evaluate('document.querySelector("#service").value==="Wedding DJs"'),'wedding CTA prefills the catalogue service');
    await navigate('/contact?occasion=Corporate+event&service=Karaoke+Entertainment&date=2027-06-12');
    assert(await evaluate('document.querySelector("#occasion").value==="Corporate event" && document.querySelector("#service").value==="Karaoke Entertainment" && document.querySelector("#eventDate").value==="2027-06-12"'),'enquiry query prefill works');
    assert(await evaluate('document.querySelector("[data-enquiry] button[type=submit]").disabled'),'collection stays disabled pending launch setup');
    // Browser-only fixtures: no real POST request or email is sent.
    await evaluate(`window.fetch=async()=>({ok:false});document.querySelector('#name').value='QA Guest';document.querySelector('#email').value='qa@example.com';document.querySelector('#county').value='Longford';document.querySelector('#venue').value='QA venue';document.querySelector('[data-enquiry] button[type=submit]').disabled=false;document.querySelector('[data-enquiry]').requestSubmit()`);
    await sleep(50);
    assert(await evaluate('document.querySelector("#email").value==="qa@example.com" && document.querySelector("[role=status]").textContent.includes("could not")'),'failed submission retains details and reports failure');
    await evaluate(`window.fetch=async()=>({ok:true});document.querySelector('[data-enquiry]').requestSubmit()`);await sleep(50);
    assert(await evaluate('document.querySelector("[role=status]").textContent.includes("submitted for review")'),'accepted fixture shows an honest persistent status');
    await navigate('/services/wedding-dj');await screenshot('wedding-mobile');
    await viewport(1440);await screenshot('wedding-desktop');await navigate('/services/music-bingo');await screenshot('songo-desktop');
    assert(await evaluate('document.body.textContent.includes("Songo franchisee")'),'Songo franchise identity is visible');
    await navigate('/wedding-questionnaire');
    for(let i=0;i<100;i++){if(await evaluate('document.querySelector("astro-island")?.hasAttribute("ssr")'))await sleep(50);else break;}
    assert(await evaluate('!document.querySelector("astro-island")?.hasAttribute("ssr")'),'questionnaire hydrates before interaction');
    await evaluate(`[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='Next')?.click()`);
      assert(await evaluate("document.body.textContent.includes('Step 1 of 8')"),'required questionnaire fields block Next');
      // React inputs must receive native setter/input events, not only DOM assignments.
    await evaluate(`for(const [id,value] of Object.entries({brideName:'QA One',groomName:'QA Two',email:'qa@example.com',phone:'086 0000000',weddingDate:'2027-06-12',guestCount:'100',venueName:'QA Venue',venueAddress:'QA Address'})){const input=document.getElementById(id);Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,value);input.dispatchEvent(new Event('input',{bubbles:true}));}`);
    await sleep(80);
    for(let step=2;step<=8;step++){
        await evaluate(`for(const input of document.querySelectorAll('input[required]')){if(!input.value){Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,input.type==='time'?'19:00':'To be confirmed');input.dispatchEvent(new Event('input',{bubbles:true}));}}`);await sleep(50);
      await evaluate(`[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='Next')?.click()`);await sleep(50);
      assert(await evaluate(`document.body.textContent.includes('Step ${step} of 8')`),'questionnaire reaches step '+step);
    }
    assert(await evaluate('document.querySelector("button[type=submit]").disabled'),'questionnaire cannot submit before activation');
    for(const route of ['/events','/missing-page'])assert((await fetch(base+route)).status===404,route+' returns 404');
    assert(errors.length===0,'no browser runtime exceptions');
    console.log('PASS: browser checks complete; screenshots saved; no external submissions made.');
  }finally{if(ws)ws.close();browser.kill();}
})().catch(error=>{console.error(error);process.exitCode=1;});
