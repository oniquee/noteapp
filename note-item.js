class NoteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Styling for note item */
                li {
                    background-color: #fff385;
                    margin: 5px 0;
                    padding: 20px;
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    height: 200px;
                    width: 200px;
                    margin: 10px;
                    border-radius: 10px;
                    box-shadow: 5px 5px 5px #b3b3b3;
                }

                li span {
                    font-size: 12px;
                    flex-grow: 1;
                    word-wrap: break-word;
                    overflow-y: scroll;
                }

                #editBtn,
                #deleteBtn {
                    background-color: #6fb0c1;
                    color: #fff;
                    border: none;
                    padding: 5px 10px;
                    margin: 0 5px;
                    cursor: pointer;
                    border-radius: 4px;
                    font-size: 12px;
                    width: 60px;
                }

                #editBtn {
                    background-color: grey;
                }

                #deleteBtn:hover {
                    background-color: #316E7D;
                }

                #editBtn:hover {
                    background-color: #141E24;
                }
            </style>
            <li>
            <h3><slot name="title">
            ${this.getAttribute('title')}
            </slot></h3>
            <p><slot name="body">
            ${this.getAttribute('body')}
            </slot></p>
            <div id="noteBtns-container">
                <button id="editBtn"><i class="fa-solid fa-pen"></i></button>
                <button id="deleteBtn"><i class="fa-solid fa-trash"></i></button>
            </div>
        </li>
        `;
    }
}

customElements.define('note-item', NoteItem);
