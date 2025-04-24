export const submitToGoogleForm = async (data: {
  participantId: string;
  clicks: number;
  duration: number;
  pageViews: string;
}) => {
  const formData = new FormData();
  
  // Voeg de data toe aan het formulier
  formData.append('entry.1234567890', data.participantId); // Vervang met je eigen entry ID
  formData.append('entry.1234567891', data.clicks.toString());
  formData.append('entry.1234567892', data.duration.toString());
  formData.append('entry.1234567893', data.pageViews);
  formData.append('entry.1234567894', new Date().toISOString());

  try {
    // Stuur de data naar het Google Form
    await fetch('https://docs.google.com/forms/d/1ifFGdV1EW5Cj7TIAd3MocTUJx4hE7_eiLUKTJlVlMYs/formResponse', {
      method: 'POST',
      body: formData,
      mode: 'no-cors', // Voeg dit toe om CORS problemen te voorkomen
    });
    
    console.log('Data submitted successfully');
  } catch (error) {
    console.error('Error submitting data:', error);
  }
}; 