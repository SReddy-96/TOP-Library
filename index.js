const myLibrary = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        numberOfPages: 180,
        readStatus: "read"
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        numberOfPages: 432,
        readStatus: "unread"
    },
    {
        title: "1984",
        author: "George Orwell",
        numberOfPages: 328,
        readStatus: "read"
    },
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        numberOfPages: 197,
        readStatus: "unread"
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        numberOfPages: 281,
        readStatus: "read"
    },
    {
        title: "The Kite Runner",
        author: "Khaled Hosseini",
        numberOfPages: 371,
        readStatus: "unread"
    }
];

document.addEventListener('DOMContentLoaded', function () {
    let button = this.getElementById('addBook');
    LibraryToMain(myLibrary);


    button.addEventListener('click', function () {
        if (document.getElementById("form").style.display == "flex") {
            document.getElementById("form").style.display = "none";
        } else {
            document.getElementById("form").style.display = "flex";
        }
    })
})

function LibraryToMain(myLibrary) {
    let main = document.getElementsByClassName("main")[0];

    for (let book in myLibrary) {
        let card = document.createElement('div');
        let title = document.createElement('h2');
        let author = document.createElement('p');
        let numberOfPages = document.createElement('p');
        let readStatus = document.createElement('p');

        title.textContent = myLibrary[book].title;
        author.textContent = myLibrary[book].author;
        numberOfPages.textContent = `Pages: ${myLibrary[book].numberOfPages}`;
        readStatus.textContent = `Read: ${myLibrary[book].readStatus}`;

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(numberOfPages);
        card.appendChild(readStatus);

        card.className = 'card';
        
        main.appendChild(card);
        console.log(myLibrary[book]);
    }
}


function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = () => {
        return (`${this.title} by ${this.author}, ${this.pages}pages, ${this.read}`)
    }
}

function addBookToLibrary() {
    // do stuff here
}