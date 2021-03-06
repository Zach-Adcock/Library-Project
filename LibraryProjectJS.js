

//Create array for books
libraryBooks = [
    {title: 'Catch 22',
    author: 'Joseph Heller',
    pages: '453',
    read: 'Read'
    },
    {title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    pages: '277',
    read: 'Read'
    },
    {title: 'The Davinci Code',
    author: 'Dan Brown',
    pages: '689',
    read: 'Not Read'
    }
];

//Book constructor
class Book{
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
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
        cardPages.innerText = "Pages: " + book.pages;
        cardPages.className = 'book-pages';

        const cardRead = document.createElement('div')
        cardRead.innerText = book.read;
        cardRead.className = 'book-read';

        //Delete and read Toggle into one div
        const deleteBook = document.createElement('button');
        deleteBook.innerText = 'Remove';
        deleteBook.className = 'book-deleter';

        const readSymbol = document.createElement('i');
        if (book.read == 'Read'){
            readSymbol.classList.add('fas', 'fa-book-open')
        } else if (book.read == 'Not Read'){
            readSymbol.classList.add('fas', 'fa-book')
        }
        readSymbol.classList.add('book-read-toggle');
        
        const bookModifications = document.createElement('div');
        bookModifications.className = 'book-modifications';
        bookModifications.append(deleteBook, readSymbol);

        card.append(cardTitle,cardAuthor,cardPages,cardRead, bookModifications);
        cardContainer.append(card);

    };

    



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

        
        let title = document.getElementById('title-input').value;
        let author = document.getElementById('author-input').value;
        let pages = document.getElementById('pages-input').value;
        let read = readValue;
        let book = new Book(title,author,pages,read);

        libraryBooks.push(book);
        displayNewBook(book);
        document.querySelector('form').reset();
        closeModal(document.getElementById('book-modal')); //closes modal after submitting book
        updateStorage();

        console.log("Form has been submitted")
    });

    //Remove book from library when remove button is clicked

    document.addEventListener('click', e => {
        if (e.target.matches('.book-deleter')) {
            const div = e.target;
            deleteBook(div);
        }
    });


    function deleteBook(div){
        const titleCard = div.closest('.book-card').querySelector('.book-title');
        const newLibraryArray = libraryBooks.filter(book => book.title !== titleCard.innerText) ;
        libraryBooks = newLibraryArray;
        const toRemove = div.closest('.book-card');
        toRemove.remove();
        updateStorage();

    };

    //Closed Book Icon
    const closedBook = document.createElement('i');
    closedBook.className = "fas fa-book";


    //Open Book Icon
    const openBook = document.createElement('i');
    openBook.className = "fas fa-book-open";

    // function toggleIcon 
    document.addEventListener('click', e => {
        if (e.target.matches('.fas')) {
            const icon = e.target;
            const title = icon.closest('.book-card').querySelector('.book-title').innerText;
            if (icon.classList.contains('fa-book-open')){ //If icon book is open, close it
                icon.classList.remove('fa-book-open');
                icon.classList.add('fa-book');
                icon.closest('.book-card').querySelector('.book-read').innerText = 'Not Read'; //Modify text from Read to Not Read
                const objIndex = libraryBooks.findIndex(obj => obj.title == title);
                libraryBooks[objIndex].read = 'Not Read';
                updateStorage();



            } else if (icon.classList.contains('fa-book')) { //If icon book is closed, open it
                icon.classList.remove('fa-book');
                icon.classList.add('fa-book-open');
                icon.closest('.book-card').querySelector('.book-read').innerText = 'Read'; //Modify text from Not Read to Read
                const objIndex = libraryBooks.findIndex(obj => obj.title == title);
                libraryBooks[objIndex].read = 'Read';
                updateStorage();
            };
        };
    });


    //Clear Library Button
    const clearBtn = document.getElementById('clear-btn');
    clearBtn.addEventListener('click', () => {
        document.querySelectorAll('.book-card').forEach((item) => item.remove());
        libraryBooks = [];
        localStorage.setItem('libraryBooks', JSON.stringify(libraryBooks));

    });




    //Set up local storage
    const checkStorage = function() {
        if(!localStorage.getItem('libraryBooks')) {
            //Load preset library array
            displayBooks();
            return
        } else {
            libraryBooks = JSON.parse(localStorage.getItem('libraryBooks'));
            displayBooks();
        }
    };


    const updateStorage = function() {
        localStorage.setItem('libraryBooks', JSON.stringify(libraryBooks));
    };
    checkStorage()
})

