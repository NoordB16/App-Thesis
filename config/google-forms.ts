export const GOOGLE_FORMS_CONFIG = {
  // Vervang dit met je Google Form endpoint
  // Je kunt dit vinden door:
  // 1. Je form te openen
  // 2. Op de drie puntjes te klikken
  // 3. "Get pre-filled link" te selecteren
  // 4. De URL te kopiëren en de "viewform" te vervangen door "formResponse"
  endpoint: 'https://docs.google.com/forms/d/1ifFGdV1EW5Cj7TIAd3MocTUJx4hE7_eiLUKTJlVlMYs/formResponse',
  
  // Vervang deze met de entry IDs van je form velden
  // Je kunt deze vinden door:
  // 1. Je form te openen
  // 2. Rechts te klikken op een veld
  // 3. "Inspecteren" te selecteren
  // 4. In de HTML te zoeken naar "entry."
  formFields: {
    participantId: 'entry.1234567890',
    clicks: 'entry.1234567891',
    duration: 'entry.1234567892',
    pageViews: 'entry.1234567893',
    timestamp: 'entry.1234567894',
  },
}; 