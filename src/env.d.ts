/// <reference types="astro/client" />
interface Window {
  ledjsAnalytics?: { consent: boolean; provider: (event: string, properties: Record<string,string>) => void };
}
