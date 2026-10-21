import { questionnaireArrayFields, questionnaireError, validDate } from '../../src/lib/questionnaire-validation.mjs';
import { counties } from '../../src/config/business.mjs';
import { services } from '../../src/content/services.mjs';
import { questionnaireFields } from '../../src/lib/questionnaire-fields.mjs';
const forms = ['ledjs-enquiry','ledjs-wedding-questionnaire'];
const occasions = ['Wedding','Private party','Corporate event','Fundraiser','Venue night'];
const serviceNames = ['Help me choose', ...services.map(s=>s.title), 'A mix of services'];
const invalid = field => { throw new Error(`Invalid ${field}`); };
const value = (data,key,max,required=false) => {
  const raw=data[key] ?? ''; if(typeof raw!=='string') return invalid(key);
  const text=raw.trim(); if(text.length>max || /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(text) || (required&&!text)) return invalid(key);
  return text;
};
export function parseSubmission(data) {
  if(!data || typeof data!=='object' || !forms.includes(data['form-name'])) return invalid('form');
  const formName=data['form-name'];
  const reference=value(data,'reference',70,true);
  if(!/^LEDJS-[a-f0-9-]{36}$/i.test(reference)) return invalid('reference');
  const email=value(data,'email',254,true).toLowerCase();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return invalid('email');
  const result={formName,reference,name:value(data,'name',240,true),email,phone:value(data,'phone',40),sourcePath:value(data,'sourcePath',150)};
  if(result.sourcePath && !/^\/[a-z\d/_-]*$/i.test(result.sourcePath)) return invalid('source path');
  if(formName==='ledjs-wedding-questionnaire') {
    let answers;try{answers=JSON.parse(value(data,'answers',100000,true));}catch{return invalid('answers');}
    if(!answers || Array.isArray(answers) || typeof answers!=='object' || Object.keys(answers).length!==questionnaireFields.length || Object.keys(answers).some(k=>!questionnaireFields.includes(k))) return invalid('answer fields');
    const parsed={};
    for(const key of questionnaireFields){
      const raw=answers[key];
      if(questionnaireArrayFields.includes(key)!==Array.isArray(raw)) return invalid(key);
      if(Array.isArray(raw)){if(raw.length>30 || raw.some(v=>typeof v!=='string'||v.length>200)) return invalid(key);parsed[key]=raw;}
      else parsed[key]=value(answers,key,4000);
    }
    const fieldError=questionnaireError(parsed);if(fieldError) return invalid(fieldError);
    if(!parsed.brideName || !parsed.groomName || !parsed.phone || parsed.email.toLowerCase()!==email) return invalid('couple details');
    return {...result,answers:parsed};
  }
  const county=value(data,'county',80,true);if(![...counties,'Elsewhere in Ireland'].includes(county)) return invalid('county');
  const occasion=value(data,'occasion',60,true);if(!occasions.includes(occasion)) return invalid('occasion');
  const service=value(data,'service',100,true);if(!serviceNames.includes(service)) return invalid('service');
  const eventDate=value(data,'eventDate',10);
  if(eventDate){
    if(!validDate(eventDate)) return invalid('event date');
  }
  const guests=value(data,'guests',5);if(guests && (!/^\d+$/.test(guests)||Number(guests)<1||Number(guests)>10000)) return invalid('guest count');
  return {...result,county,occasion,service,eventDate,guests,venue:value(data,'venue',180,true),notes:value(data,'notes',3000)};
}
