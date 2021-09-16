

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


//Function to display all books in libraryBooks
const cardContainer = document.getElementById('book-cards-container');
const displayBooks = () => {
    for (let i = 0; i < libraryBooks.length; i++) {
        const item = libraryBooks[i];
        const card = document.createElement('div');
        card.className = 'book-card';

        const cardTitle = document.createElement('div')
        cardTitle.innerText = item.title;
        cardTitle.className = 'book-title';

        const cardAuthor = document.createElement('div')
        cardAuthor.innerText = "By: " + item.author;
        cardAuthor.className = 'book-author';


        const cardPages = document.createElement('div')
        cardPages.innerText = "Number of pages: " + item.pages;
        cardPages.className = 'book-pages';

        const cardRead = document.createElement('div')
        cardRead.innerText = item.read;
        cardRead.className = 'book-read';


        card.append(cardTitle,cardAuthor,cardPages,cardRead);
        cardContainer.append(card);
    }
    
};


//create HTML button
let newBookButton = document.createElement("button");
newBookButton.innerText = "New Book";
document.body.append(newBookButton);

displayBooks();