const notesData = [
  {
    id: 'notes-jT-jjsyz61J8XKiI',
    title: 'Welcome to Notes, Dimas!',
    body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
    createdAt: '2022-07-28T10:03:12.594Z',
    archived: false,
  },
  {
    id: 'notes-aB-cdefg12345',
    title: 'Meeting Agenda',
    body: 'Discuss project updates and assign tasks for the upcoming week.',
    createdAt: '2022-08-05T15:30:00.000Z',
    archived: false,
  },
  {
    id: 'notes-XyZ-789012345',
    title: 'Shopping List',
    body: 'Milk, eggs, bread, fruits, and vegetables.',
    createdAt: '2022-08-10T08:45:23.120Z',
    archived: false,
  },
  {
    id: 'notes-1a-2b3c4d5e6f',
    title: 'Personal Goals',
    body: 'Read two books per month, exercise three times a week, learn a new language.',
    createdAt: '2022-08-15T18:12:55.789Z',
    archived: false,
  },
  {
    id: 'notes-LMN-456789',
    title: 'Recipe: Spaghetti Bolognese',
    body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
    createdAt: '2022-08-20T12:30:40.200Z',
    archived: false,
  },
  {
    id: 'notes-QwErTyUiOp',
    title: 'Workout Routine',
    body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
    createdAt: '2022-08-25T09:15:17.890Z',
    archived: false,
  },
  {
    id: 'notes-abcdef-987654',
    title: 'Book Recommendations',
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
    createdAt: '2022-09-01T14:20:05.321Z',
    archived: false,
  },
  {
    id: 'notes-zyxwv-54321',
    title: 'Daily Reflections',
    body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
    createdAt: '2022-09-07T20:40:30.150Z',
    archived: false,
  },
  {
    id: 'notes-poiuyt-987654',
    title: 'Travel Bucket List',
    body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
    createdAt: '2022-09-15T11:55:44.678Z',
    archived: false,
  },
  {
    id: 'notes-asdfgh-123456',
    title: 'Coding Projects',
    body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
    createdAt: '2022-09-20T17:10:12.987Z',
    archived: false,
  },
  {
    id: 'notes-5678-abcd-efgh',
    title: 'Project Deadline',
    body: 'Complete project tasks by the deadline on October 1st.',
    createdAt: '2022-09-28T14:00:00.000Z',
    archived: false,
  },
  {
    id: 'notes-9876-wxyz-1234',
    title: 'Health Checkup',
    body: 'Schedule a routine health checkup with the doctor.',
    createdAt: '2022-10-05T09:30:45.600Z',
    archived: false,
  },
  {
    id: 'notes-qwerty-8765-4321',
    title: 'Financial Goals',
    body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
    createdAt: '2022-10-12T12:15:30.890Z',
    archived: false,
  },
  {
    id: 'notes-98765-54321-12345',
    title: 'Holiday Plans',
    body: 'Research and plan for the upcoming holiday destination.',
    createdAt: '2022-10-20T16:45:00.000Z',
    archived: false,
  },
  {
    id: 'notes-1234-abcd-5678',
    title: 'Language Learning',
    body: 'Practice Spanish vocabulary for 30 minutes every day.',
    createdAt: '2022-10-28T08:00:20.120Z',
    archived: false,
  },
];

function displayNotes() {
  const notesList = document.getElementById('notes-list');
  notesList.innerHTML = '';

  notesData.forEach(note => {
    const listItem = document.createElement('div');
    listItem.classList.add('note-item');

    const titleElement = document.createElement('h2');
    titleElement.textContent = note.title;

    const bodyElement = document.createElement('p');
    bodyElement.textContent = note.body;

    listItem.appendChild(titleElement);
    listItem.appendChild(bodyElement);

    notesList.appendChild(listItem);
  });
}

// Menambah fungsi untuk menampilkan catatan dari API
async function displayNotesAPI() {
  const notesList = document.getElementById('notes-list');
  notesList.innerHTML = '';

  const notesData = await fetchNotesAPI();
  notesData.forEach(note => {
    const noteItem = document.createElement('note-item');
    noteItem.innerHTML = `
      <span slot="title">${note.title}</span>
      <span slot="body">${note.body}</span>
    `;
    notesList.appendChild(noteItem);
  });
}

// Memanggil displayNotesAPI saat aplikasi dimuat
document.addEventListener('DOMContentLoaded', () => {
  displayNotesAPI();
});

//Mengirim POST untuk menambahkan catatan baru
async function createNoteAPI(title, body) {
  const apiUrl = 'https://notes-api.dicoding.dev/v2/notes';
  const data = { title, body };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to add new note.');
    }

    const responseData = await response.json();
    console.log('New note ID:', responseData.data.id);

    // Refresh list after adding new note
    displayNotes();
  } catch (error) {
    console.error('Error adding new note:', error.message);
  }
}

//Mengirim DELETE untuk menghapus catatan
async function deleteNoteById(noteId) {
  const apiUrl = `https://notes-api.dicoding.dev/v2/notes/${noteId}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete note.');
    }

    // Refresh list after deleting note
    displayNotes();
  } catch (error) {
    console.error('Error deleting note:', error.message);
  }
}

// Menambahkan event listener untuk form dari AddNoteForm
document.addEventListener('submit', async (event) => {
  event.preventDefault(); // Mencegah aksi default dari form submit
  const title = event.target.elements['note-title'].value.trim();
  const body = event.target.elements['note-text'].value.trim();

  if (title && body) {
    createNoteAPI(title, body);
    event.target.reset(); // Kosongkan form setelah catatan dibuat
  }
});

// Menambah event listener untuk menangkap event 'add-note' dari custom element <add-note-form>
document.addEventListener('add-note', async (event) => {
  const { title, body } = event.detail;
  createNoteAPI(title, body);
});

//Mengirim GET untuk mendapatkan daftar catatan
async function fetchNotesAPI() {
  const apiUrl = 'https://notes-api.dicoding.dev/v2/notes';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch notes.');
    }

    const data = await response.json();
    return data.data; // Mengembalikan array data catatan dari respons
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    return [];
  }
}

// Mengganti displayNotes dengan displayNotesAPI
async function displayNotesAPI() {
  const notesList = document.getElementById('notes-list');
  notesList.innerHTML = '';

  const notesData = await fetchNotesAPI();
  notesData.forEach(note => {
    const listItem = document.createElement('div');
    listItem.classList.add('note-item');

    const titleElement = document.createElement('h2');
    titleElement.textContent = note.title;

    const bodyElement = document.createElement('p');
    bodyElement.textContent = note.body;

    listItem.appendChild(titleElement);
    listItem.appendChild(bodyElement);

    notesList.appendChild(listItem);
  });
}

// Memanggil displayNotesAPI saat aplikasi dimuat
document.addEventListener('DOMContentLoaded', () => {
  displayNotesAPI();
});

// Mengirim DELETE untuk menghapus catatan
async function deleteNoteById(noteId) {
  const apiUrl = `https://notes-api.dicoding.dev/v2/notes/${noteId}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete note.');
    }

    // Refresh list after deleting note
    displayNotes();
  } catch (error) {
    console.error('Error deleting note:', error.message);
  }
}

// Endpoint constants
const API_URL = 'https://notes-api.dicoding.dev/v2';
const NOTES_ENDPOINT = '/notes';
const ARCHIVED_NOTES_ENDPOINT = '/notes/archived';

// Function to fetch all non-archived notes
async function fetchNonArchivedNotes() {
  try {
    showLoadingIndicator(); // Tampilkan indikator loading sebelum permintaan dimulai

    const response = await fetch(`${API_URL}${NOTES_ENDPOINT}`, {
      method: 'GET',
    });
    const data = await response.json();
    console.log('Non-archived notes:', data.data);

    hideLoadingIndicator(); // Sembunyikan indikator loading setelah permintaan selesai
  } catch (error) {
    console.error('Error fetching non-archived notes:', error);
    hideLoadingIndicator(); // Sembunyikan indikator loading jika terjadi kesalahan
  }
}

// Function to show loading indicator
function showLoadingIndicator() {
  const loadingIndicator = document.getElementById('loadingIndicator');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'block';
  }
}

// Function to hide loading indicator
function hideLoadingIndicator() {
  const loadingIndicator = document.getElementById('loadingIndicator');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'none';
  }
}

// Call the fetch functions
fetchNonArchivedNotes();