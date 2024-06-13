const myLibrary = [];

// book constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.numberOfPages = pages
    this.readStatus = read
}

// prototype for changing read or not read
Book.prototype.toggleRead = function () {
    if (this.readStatus == "No") {
        return this.readStatus = "Yes";
    } else {
        return this.readStatus = "No";
    }
}



document.addEventListener('DOMContentLoaded', function () {
    let button = this.getElementById('addBook');
    let form = this.getElementById('form');

    // to submit the form
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // prevent reload of page
        addBookToLibrary();
        document.getElementById("formDiv").style.display = "none"; // hide the form
        this.reset(); // reset the form 
    })

    // to show and hide form 
    button.addEventListener('click', function () {
        if (document.getElementById("formDiv").style.display == "flex") {
            document.getElementById("formDiv").style.display = "none";
        } else {
            document.getElementById("formDiv").style.display = "flex";
        }
    })

})

function LibraryToMain() {
    let main = document.getElementsByClassName("main")[0];
    main.innerHTML = '';  // reset main to not print out books again

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

        // button div
        let buttonDiv = document.createElement('div')
        buttonDiv.className = "buttonDiv"

        // delete button
        let deleteButton = document.createElement('button');
        deleteButton.innerText = "Delete";
        deleteButton.className = "deleteButton"

        // read button
        let readButton = document.createElement('button');
        readButton.className = "readButton"

        // change button if read
        if (myLibrary[book].readStatus == "No") {
            readButton.innerText = "Read";
        } else if(myLibrary[book].readStatus == "Yes"){
            readButton.innerText = "UnRead";
        }

        // add id to buttons
        readButton.setAttribute('data-id', book)
        deleteButton.setAttribute('data-id', book)

        // button event listener
        deleteButton.addEventListener('click', function () {
            let bookId = this.dataset.id;

            card.style.opacity = '0';
            setTimeout(() => deleteBook(bookId), 1000); // delete slowly
        });

        readButton.addEventListener('click', function () {
            let bookId = this.dataset.id;
            toggleRead(bookId);
        });


        buttonDiv.append(deleteButton, readButton)

        card.append(title, author, numberOfPages, readStatus, buttonDiv)

        card.className = 'card';

        main.appendChild(card);
    }
}


function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const numberOfPages = document.getElementById('pages').value;
    const read = document.querySelector('input[name="readStatusRadio"]:checked').value;

    // add book to array with constructor
    myLibrary.push(new Book(title, author, numberOfPages, read));
    LibraryToMain() // show books
}

function toggleRead(bookId) {
    myLibrary[bookId].toggleRead();
    LibraryToMain();
}

function deleteBook(bookId) {
    if (bookId > -1) { // only splice array when item is found.
        myLibrary.splice(bookId, 1); // 2nd parameter means remove one item only
    }
    LibraryToMain();
}