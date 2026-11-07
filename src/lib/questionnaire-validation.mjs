export const requiredQuestionnaireFields = ['brideName','groomName','email','phone','weddingDate','guestCount','venueName','venueAddress','receptionStart','receptionEnd','introStyle','firstDanceSong'];
export const questionnaireArrayFields = ['priorities','traditions','mcStyle','interactive','addons'];
export function validDate(value) {
 if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
 const date = new Date(value+'T00:00:00Z');
 return Number.isFinite(date.valueOf()) && date.toISOString().slice(0,10) === value;
}
export function questionnaireError(answers) {
 for (const key of requiredQuestionnaireFields) if (typeof answers[key] !== 'string' || !answers[key].trim()) return key;
 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) return 'email';
 if (!validDate(answers.weddingDate)) return 'weddingDate';
 if (!/^\d+$/.test(answers.guestCount) || +answers.guestCount < 1 || +answers.guestCount > 10000) return 'guestCount';
 for (const key of ['receptionStart','receptionEnd']) if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(answers[key])) return key;
 return null;
}
