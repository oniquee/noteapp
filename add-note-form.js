// Custom Element: Add Note Form
class AddNoteForm extends HTMLElement {
    constructor() {
      super();
      // Buat shadow DOM
      const shadow = this.attachShadow({ mode: 'open' });
  
      // Definisikan template
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          /* Gaya CSS untuk custom element */
          /* Gunakan gaya CSS sesuai kebutuhan */
          form {
            display: grid;
            gap: 10px;
          }
          
          #note-text {
            width: auto;
          }
          
          input[type="text"],
          textarea {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            margin-top: 20px;
          }
          
          #btn-submit {
            padding: 10px;
            background-color: #316E7D;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            margin-bottom: 10px;
          }
          
          #btn-submit:hover {
            background-color: #6fb0c1;
          }

          textarea {
            width: 300px;
            height: 200px;
            padding: 10px;
            box-sizing: border-box;
            border-radius: 4px;
            border: 2px solid #316E7D;
            margin-top: 5px;
          }
          
        </style>
        <form>
          <input type="text" id="noteTitle" placeholder="Title for your note" required>
          <textarea id="note-text" placeholder="Enter your note here..." required></textarea>
          <button id="btn-submit" type="submit">Add Note</button>
        </form>
      `;
  
      // Salin konten template ke shadow DOM
      shadow.appendChild(template.content.cloneNode(true));
  
      // Tambahkan event listener untuk tombol submit
      shadow.getElementById('btn-submit').addEventListener('click', this.handleSubmit.bind(this));
    }
  
    // Method untuk menangani submit form
    handleSubmit(event) {
      event.preventDefault(); // Mencegah aksi default dari form submit
  
      // Ambil nilai judul dan isi catatan dari input
      const noteTitle = this.shadowRoot.getElementById('noteTitle').value.trim();
      const noteText = this.shadowRoot.getElementById('note-text').value.trim();
  
      if (noteTitle !== '' && noteText !== '') { // Pastikan kedua nilai tidak kosong
        // Kirim event 'add-note' dengan detail data catatan
        this.dispatchEvent(new CustomEvent('add-note', {
          detail: {
            title: noteTitle,
            body: noteText
          }
        }));
  
        // Kosongkan input setelah catatan dibuat
        this.shadowRoot.getElementById('noteTitle').value = '';
        this.shadowRoot.getElementById('note-text').value = '';
      }
    }
  }
  
  // Daftarkan custom element ke dalam DOM
  customElements.define('add-note-form', AddNoteForm);