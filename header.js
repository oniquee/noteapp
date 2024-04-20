class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                /* Styles for the header */
                header {
                    background-color: #316E7D;
                    color: #fff;
                    padding: 25px;
                    text-align: center;
                    border-radius: 8px;
                }
                h1 {
                    margin: 0;
                    font-size: 30px;
                }
                nav {
                    margin-top: 10px;
                    font-size: 15px
                }
                nav a {
                    color: #fff;
                    text-decoration: none;
                    margin: 0 10px;
                }
                nav a:hover {
                    text-decoration: none;
                    color: #fff385;
                }
            </style>
            <header>
                <h1>My Notes App</h1>
                <nav>
                    <a href="#newnotes">New Notes</a>
                    <a href="#completed">Completed</a>
                    <a href="#uncomplete">Uncomplete</a>
                </nav>
            </header>
        `;
    }
}

customElements.define('app-header', AppHeader);
