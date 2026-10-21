export const makeReference = () => `LEDJS-${crypto.randomUUID()}`;
export async function postForm(fields, fetcher = fetch) {
  const response = await fetcher('/__forms.html', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:new URLSearchParams(fields).toString() });
  if (!response.ok) throw new Error('Your request could not be submitted. Your details are still here; please try again or contact Dave directly.');
}
