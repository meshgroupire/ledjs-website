export function GET() {
  return new Response(`User-agent: *\nAllow: /\n${process.env.CONTEXT === 'production' ? '\nSitemap: https://theledjs.ie/sitemap.xml\n' : ''}`, {headers:{'Content-Type':'text/plain; charset=utf-8'}});
}
