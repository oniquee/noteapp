import "./style.css";

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
  const title = document.getElementById('noteTitle').value.trim();
  const body = document.getElementById('note-text').value.trim();

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