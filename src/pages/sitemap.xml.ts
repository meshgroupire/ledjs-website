import { publishedPages } from '../content/services.mjs';
import { business } from '../config/business.mjs';
export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publishedPages.map(path=>`<url><loc>${business.url}/${path}</loc></url>`).join('')}</urlset>`;
  return new Response(xml, { headers:{'Content-Type':'application/xml; charset=utf-8'} });
}
