// Endpoint constants
const API_URL = 'https://notes-api.dicoding.dev/v2';
const NOTES_ENDPOINT = '/notes';
const ARCHIVED_NOTES_ENDPOINT = '/notes/archived';

// Function to fetch all non-archived notes
async function fetchNonArchivedNotes() {
  try {
    const response = await fetch(`${API_URL}${NOTES_ENDPOINT}`, {
      method: 'GET',
    });
    const data = await response.json();
    console.log('Non-archived notes:', data.data);
  } catch (error) {
    console.error('Error fetching non-archived notes:', error);
  }
}

// Function to fetch all archived notes
async function fetchArchivedNotes() {
  try {
    const response = await fetch(`${API_URL}${ARCHIVED_NOTES_ENDPOINT}`, {
      method: 'GET',
    });
    const data = await response.json();
    console.log('Archived notes:', data.data);
  } catch (error) {
    console.error('Error fetching archived notes:', error);
  }
}

// Call the fetch functions
fetchNonArchivedNotes();
fetchArchivedNotes();

async function createNote() {
    const title = 'New Note Title';
    const body = 'Content of the new note';
  
    try {
        const response = await fetch(`${API_URL}${NOTES_ENDPOINT}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body }),
          });
      const data = await response.json();
      console.log('New Note ID:', data.data.id);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  }
  
  // Panggil fungsi untuk membuat catatan baru
  createNote();

  async function getNotes() {
    try {
        const response = await fetch(`${API_URL}${NOTES_ENDPOINT}`);
        const data = await response.json();
        data.data.forEach((note) => {
            console.log('Note ID:', note.id);
            console.log('Title:', note.title);
            console.log('Body:', note.body);
            console.log('Created At:', note.createdAt);
        });
        } catch (error) {
        console.error('Error getting notes:', error);
        }
    }
  
  // Panggil fungsi untuk mendapatkan daftar catatan
  getNotes();
