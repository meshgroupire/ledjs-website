export const counties = ['Cavan', 'Leitrim', 'Westmeath', 'Longford', 'Meath', 'Mayo', 'Galway', 'Dublin', 'Offaly'];
export const business = {
  name: 'LEDJS', url: 'https://theledjs.ie', email: 'dave@theledjs.ie',
  phone: '086 895 7442', telephone: '+353868957442', whatsapp: '353868957442',
};
export const whatsappUrl = (message = "Hi Dave, I'd like to discuss LEDJS entertainment for my event.") =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
