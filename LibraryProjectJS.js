

//Create array for books
libraryBooks = [
    {title: 'Title1',
    author: 'Author1',
    pages: 100,
    read: true
    },
    {title: 'Title2',
    author: 'Author2',
    pages: 200,
    read: false
    },
    {title: 'Title3',
    author: 'Author3',
    pages: 300,
    read: true
    }
];

//Book constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return `${title}, ${author}, ${pages}, ${read}`
    }
};

// Function to add Book to libraryBooks array
const addBooktoLibrary = () => {
    var title = window.prompt("Title?");
    var author = window.prompt("Author?");
    var pages = parseInt(window.prompt("Pages?"));
    var read = window.prompt("Read?").toLocaleLowerCase();
    title = new Book(title,author,pages,(read==='true'));
    libraryBooks.push(title);

};


document.addEventListener('DOMContentLoaded', () => {

    //Function to display all books in libraryBooks
    const cardContainer = document.getElementById('book-cards-container');
    const displayBooks = () => {
        for (let i = 0; i < libraryBooks.length; i++) {
            const item = libraryBooks[i];
            displayNewBook(item);
        };
        
    };


    //add single book to display
    const displayNewBook = function(book) {
        const card = document.createElement('div');
        card.className = 'book-card';

        const cardTitle = document.createElement('div')
        cardTitle.innerText = book.title;
        cardTitle.className = 'book-title';

        const cardAuthor = document.createElement('div')
        cardAuthor.innerText = "By: " + book.author;
        cardAuthor.className = 'book-author';


        const cardPages = document.createElement('div')
        cardPages.innerText = "Number of pages: " + book.pages;
        cardPages.className = 'book-pages';

        const cardRead = document.createElement('div')
        cardRead.innerText = book.read;
        cardRead.className = 'book-read';

        const deleteBook = document.createElement('button');
        deleteBook.innerText = 'Remove';
        deleteBook.className = 'book-deleter';

        const readToggle = document.createElement('button');
        readToggle.innerText = 'Read';
        readToggle.className = 'book-deleter';

        card.append(cardTitle,cardAuthor,cardPages,cardRead);
        cardContainer.append(card);
    }


    //create new book button
    // let newBookButton = document.createElement("button");
    // newBookButton.innerText = "New Book";
    // newBookButton.id = "new-book-btn";
    // newBookButton.dataset.modal.target = "#modal"
    // document.body.append(newBookButton);

    displayBooks();



    //create modal for new book inputs
    let openModalButton = document.querySelector('[data-modal-target]');

    let closeModalButton = document.querySelector('[data-close-btn]');

    let overlay = document.getElementById('overlay');


    openModalButton.addEventListener('click', () => {
        const modal = document.getElementById('book-modal');
        openModal(modal);
    });

    closeModalButton.addEventListener('click', () => {
        const modal = document.getElementById('book-modal');
        closeModal(modal);
    });

    function openModal(modal) {
        if (modal == null) return
        modal.classList.add('active');
        overlay.classList.add('active');
    };

    function closeModal(modal) {
        if (modal == null) return
        modal.classList.remove('active');
        overlay.classList.remove('active');
    };

    //close moodal if overlay is clicked
    overlay.addEventListener('click', () => {
        const modal = document.getElementById('book-modal');
        closeModal(modal);
    });


    //Taking results from form and adding book to Library array and to the display
    const bookForm = document.getElementById('book-form');
    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let readValue = document.getElementById('read-input').checked ;
        readValue = (readValue == true) ? 'Read' : 'Not Read'; //determine if the read checkbox was ticked

        const book = {
            title: document.getElementById('title-input').value,
            author: document.getElementById('author-input').value,
            pages: document.getElementById('pages-input').value,
            read: readValue
        }
        libraryBooks.push(book);
        displayNewBook(book);
        document.querySelector('form').reset();
        closeModal(document.getElementById('book-modal')); //closes modal after submitting book

        console.log("Form has been submitted")
    })

})

