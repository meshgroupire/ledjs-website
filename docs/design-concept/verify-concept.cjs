// Local review helper. Uses installed Chrome and a temporary, isolated profile.
// Run from the repository root: node docs/design-concept/verify-concept.cjs
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

(async () => {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'ledjs-concept-qa-'));
  const chrome = process.env.CONCEPT_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const browser = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', '--user-data-dir=' + profile, 'about:blank'], { windowsHide: true, stdio: 'ignore' });
  let ws;
  try {
    const portfile = path.join(profile, 'DevToolsActivePort');
    for (let i = 0; i < 100 && !fs.existsSync(portfile); i++) await new Promise(r => setTimeout(r, 100));
    if (!fs.existsSync(portfile)) throw new Error('Headless browser did not initialize');
    const port = fs.readFileSync(portfile, 'utf8').split('\n')[0];
    const targets = await (await fetch('http://127.0.0.1:' + port + '/json')).json();
    ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { ws.addEventListener('open', resolve, { once: true }); ws.addEventListener('error', reject, { once: true }); });
    let seq = 0;
    const pending = new Map();
    const errors = [];
    ws.addEventListener('message', e => {
      const m = JSON.parse(e.data);
      if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.text);
      if (m.id) { const p = pending.get(m.id); pending.delete(m.id); if (m.error) p.reject(new Error(m.error.message)); else p.resolve(m.result); }
    });
    const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++seq; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });
    const evaluate = async expression => {
      const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
      return r.result.value;
    };
    const assert = (condition, name) => { if (!condition) throw new Error('FAIL: ' + name); console.log('PASS: ' + name); };
    const screenshot = async filename => { const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true }); fs.writeFileSync(path.join(__dirname, filename), Buffer.from(shot.data, 'base64')); };
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: pathToFileURL(path.join(__dirname, 'index.html')).href });
    await new Promise(r => setTimeout(r, 1000));
    await evaluate('document.fonts.ready');
    assert(await evaluate('document.readyState === "complete"'), 'page loaded');
    console.log('Image loading diagnostic:', await evaluate('JSON.stringify([...document.images].map(i=>({file:i.getAttribute("src"),lazy:i.loading,loaded:i.complete&&i.naturalWidth>0})))'));
    // Below-fold images are intentionally lazy. Request them for full-page visual QA.
    await evaluate('Promise.all([...document.images].map(i=>{i.loading="eager";return i.decode()}))');
    assert(await evaluate('[...document.images].every(i=>i.complete&&i.naturalWidth>0)'), 'all photographs decode successfully');
    assert(await evaluate('document.documentElement.scrollWidth <= innerWidth'), 'desktop has no horizontal overflow');
    await screenshot('desktop-preview.png');
    await evaluate(`document.querySelector('[data-event="singalong"]').click(); document.querySelector('#quantity').value='3'; document.querySelector('#quantity').dispatchEvent(new Event('change'));`);
    assert(await evaluate('document.querySelector("#ticket-dialog").open && document.querySelector("#ticket-total").textContent.includes("45.00")'), 'three sample tickets total EUR45');
    await evaluate(`document.querySelector('#checkout-preview').click()`);
    assert(await evaluate('!document.querySelector("#ticket-status").hidden'), 'checkout explains simulation');
    await evaluate(`document.querySelector('#ticket-dialog').close();document.querySelector('[data-event="tune"]').click()`);
    assert(await evaluate('document.querySelector("#ticket-total").textContent.includes("20.00") && document.querySelector("#quantity").value === "1"'), 'second event resets quantity and price');
    await evaluate(`document.querySelector('#ticket-dialog').close();document.querySelector('#quick-type').value='Corporate event';document.querySelector('#quick-form').requestSubmit()`);
    assert(await evaluate('document.querySelector("#type").value === "Corporate event"'), 'quick enquiry prefills occasion');
    await evaluate(`document.querySelector('[data-service="karaoke"]').click();document.querySelector('#service-enquire').click()`);
    assert(await evaluate('document.querySelector("#service").value === "Karaoke"'), 'service selection prefills enquiry');
    assert(await evaluate('document.querySelector("#lead-form").checkValidity() === false'), 'empty required form blocked');
    await evaluate(`document.querySelector('#name').value='Sample Guest';document.querySelector('#email').value='guest@example.com';document.querySelector('#venue').value='Longford';document.querySelector('#lead-form').requestSubmit()`);
    assert(await evaluate('!document.querySelector("#form-result").hidden'), 'valid form displays preview confirmation');
    await evaluate(`document.querySelector('#email-preview').click()`);
    assert(await evaluate('document.querySelector("#email-dialog").open && document.querySelector("#email-greeting").textContent.includes("Sample Guest")'), 'email preview uses enquiry summary');
    await evaluate(`document.querySelector('#email-dialog').close();document.querySelector('[data-whatsapp]').click()`);
    assert(await evaluate('document.querySelector("#whatsapp-link").href.startsWith("https://wa.me/353868957442?text=") && decodeURIComponent(document.querySelector("#whatsapp-link").href).includes("corporate event")'), 'WhatsApp has international number and event context');
    await evaluate(`document.querySelector('#whatsapp-dialog').close()`);
    await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await evaluate('scrollTo({top:0,behavior:"instant"})');
    assert(await evaluate('document.documentElement.scrollWidth <= innerWidth'), '390px mobile has no horizontal overflow');
    await evaluate(`document.querySelector('.menu-toggle').click()`);
    assert(await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded") === "true" && getComputedStyle(document.querySelector("#nav-links")).display === "flex"'), 'mobile menu opens');
    await evaluate(`document.querySelector('#nav-links a').click()`);
    assert(await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded") === "false"'), 'mobile menu closes after selection');
    await evaluate('scrollTo({top:0,behavior:"instant"});document.querySelector("#lead-form").reset();document.querySelector("#form-result").hidden=true;document.activeElement.blur()');
    await screenshot('mobile-preview.png');
    await send('Emulation.setDeviceMetricsOverride', { width: 320, height: 700, deviceScaleFactor: 1, mobile: true });
    assert(await evaluate('document.documentElement.scrollWidth <= innerWidth'), '320px mobile has no horizontal overflow');
    for (const [file, phrase, image] of [
      ['wedding-dj.html', 'after-band', 'wedding-djs.jpg'],
      ['songo-music-bingo.html', 'Songo franchisee', 'songo-logo.png'],
    ]) {
      await send('Page.navigate', { url: pathToFileURL(path.join(__dirname, file)).href });
      await new Promise(r => setTimeout(r, 250));
      await evaluate('document.fonts.ready');
      await evaluate('Promise.all([...document.images].map(i=>i.decode()))');
      assert(await evaluate(`document.body.textContent.includes(${JSON.stringify(phrase)})`), file + ' contains researched content');
      assert(await evaluate(`!!document.querySelector('img[src$="${image}"]')`), file + ' uses intended imagery');
      assert(await evaluate('document.querySelectorAll("h1").length === 1'), file + ' has one H1');
      assert(await evaluate('document.documentElement.scrollWidth <= innerWidth'), file + ' fits 320px');
      await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
      assert(await evaluate('document.documentElement.scrollWidth <= innerWidth'), file + ' fits desktop');
      await screenshot(file.replace('.html', '-preview.png'));
      await send('Emulation.setDeviceMetricsOverride', { width: 320, height: 700, deviceScaleFactor: 1, mobile: true });
    }
    assert(errors.length === 0, 'no runtime exceptions');
    if (process.env.LEDJS_SOURCE_PREVIEW) {
      const base = process.env.LEDJS_SOURCE_PREVIEW;
      await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
      await send('Page.navigate', { url: base + '/' });
      for (let i = 0; i < 100; i++) {
        if (await evaluate('!!document.querySelector("h1")')) break;
        await new Promise(r => setTimeout(r, 100));
      }
      assert(await evaluate('document.querySelector("h1")?.textContent.includes("Your Wedding")'), 'built homepage leads with weddings');
      assert(await evaluate('document.title.includes("Wedding DJs")'), 'built homepage has wedding-focused title');
      await send('Page.navigate', { url: base + '/services' });
      for (let i = 0; i < 100; i++) {
        if (await evaluate('document.body?.textContent.includes("Songo Music Bingo")')) break;
        await new Promise(r => setTimeout(r, 100));
      }
      assert(await evaluate('document.body.textContent.includes("Songo franchisee")'), 'built services page includes franchise attribution');
      assert(await evaluate(`!!document.querySelector('img[src="/images/brands/songo-logo.png"]')`), 'built services page uses official Songo wordmark');
      assert(await evaluate(`!document.querySelector('img[src*="music-bingo.jpg"]')`), 'built services page excludes rejected photograph');
      assert(await evaluate(`!!document.querySelector('a[href="https://songo.ie/info/"]')`), 'built services page links official Songo information');
      console.log('Source-build checks completed; third-party legacy widget behaviour is outside this content pass.');
    }
    console.log('Desktop and mobile screenshots saved. No enquiry sent or payment taken.');
  } finally {
    if (ws) ws.close();
    browser.kill();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
