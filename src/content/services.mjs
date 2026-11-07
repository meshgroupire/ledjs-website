import { services as existing } from '../config/services.js';
const slugs = { 'wedding-djs':'wedding-dj', 'party-djs':'party-dj' };
export const services = existing.map(service => ({
  ...service, slug: slugs[service.id] || service.id, legacyAnchor: service.id,
  title: service.id === 'wedding-djs' ? 'Wedding DJs' : service.title,
  image: service.id === 'music-bingo' ? '/images/brands/songo-logo.png' : `/images/optimized/${service.id === 'wedding-djs' ? 'wedding-djs' : service.id === 'party-djs' ? 'ledjs5' : service.id === 'led-wristbands' ? 'ledjs6' : service.id === 'speed-quizzing' ? 'ledjs9' : 'karaoke'}-960.webp`,
}));
services.splice(2, 0, {
  id:'corporate-entertainment', legacyAnchor:'corporate-entertainment', slug:'corporate-entertainment', title:'Corporate DJs & entertainment',
  description:'Music and hosting for staff celebrations, company milestones and business events. Plan the soundtrack around your team and the occasion.',
  shortDescription:'A thoughtful soundtrack for your team, your brand and your occasion.',
  longDescription:'From a staff celebration to a company milestone, tell Dave about the atmosphere you want to create. We discuss the audience, venue and schedule so the music and hosting suit your event.\n\nA DJ set can stand on its own, or you can discuss adding Songo Music Bingo, speed quizzing or karaoke to get people involved. Share your plans for a tailored proposal.',
  image:'/images/optimized/ledjs8-960.webp', features:['Music matched to the audience and occasion','Professional sound and lighting','Hosting and interactive entertainment options','Venue, schedule and setup discussed before the event'],
});
export const primaryServices = services.slice(0,3);
export const publishedPages = ['', 'services', ...services.map(s=>`services/${s.slug}`), 'about', 'contact', 'service-areas', 'privacy', 'booking-information'];
