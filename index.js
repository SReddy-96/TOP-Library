const myLibrary = [];

// book class
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.numberOfPages = pages;
    this.readStatus = read;
  }

  // method for changing read or not read
  toggleRead = () => {
    if (this.readStatus == "No") {
      return (this.readStatus = "Yes");
    } else {
      return (this.readStatus = "No");
    }
  };
}

document.addEventListener("DOMContentLoaded", function () {
  let button = this.getElementById("addBook");
  let form = this.getElementById("form");
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");

  // check title input and displays a message if not valid
  title.addEventListener("input", function () {
    if (title.validity.valueMissing) {
      title.setCustomValidity("Please input a Title");
    } else {
      title.setCustomValidity("");
    }
  });

  // check author input and displays a message if not valid
  author.addEventListener("input", function () {
    if (author.validity.valueMissing) {
      author.setCustomValidity("Please input an author");
    } else {
      author.setCustomValidity("");
    }
  });

  // check pages input and displays a message if not valid
  pages.addEventListener("input", function () {
    if (pages.validity.valueMissing) {
      pages.setCustomValidity("Please input a pages");
    } else if (pages.validity.tooShort) {
      pages.setCustomValidity("Please input more than 0 Pages");
    } else {
      pages.setCustomValidity("");
    }
  });
    
  // to submit the form
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent reload of page
    addBookToLibrary();
    document.getElementById("formDiv").style.display = "none"; // hide the form
    this.reset(); // reset the form
  });

  // to show and hide form
  button.addEventListener("click", function () {
    if (document.getElementById("formDiv").style.display == "flex") {
      document.getElementById("formDiv").style.display = "none";
    } else {
      document.getElementById("formDiv").style.display = "flex";
    }
  });
});

// put the book on the page
function LibraryToMain() {
  let main = document.getElementsByClassName("main")[0];
  main.innerHTML = ""; // reset main to not print out books again

  for (let book in myLibrary) {
    let card = document.createElement("div");
    let title = document.createElement("h2");
    let author = document.createElement("p");
    let numberOfPages = document.createElement("p");
    let readStatus = document.createElement("p");

    title.textContent = myLibrary[book].title;
    author.textContent = myLibrary[book].author;
    numberOfPages.textContent = `Pages: ${myLibrary[book].numberOfPages}`;
    readStatus.textContent = `Read: ${myLibrary[book].readStatus}`;

    // button div
    let buttonDiv = document.createElement("div");
    buttonDiv.className = "buttonDiv";

    // delete button
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "deleteButton";

    // read button
    let readButton = document.createElement("button");
    readButton.className = "readButton";

    // change button if read
    if (myLibrary[book].readStatus == "No") {
      readButton.innerText = "Read";
    } else if (myLibrary[book].readStatus == "Yes") {
      readButton.innerText = "UnRead";
    }

    // add id to buttons
    readButton.setAttribute("data-id", book);
    deleteButton.setAttribute("data-id", book);

    // button event listener
    deleteButton.addEventListener("click", function () {
      let bookId = this.dataset.id;

      card.style.opacity = "0";
      setTimeout(() => deleteBook(bookId), 1000); // delete slowly
    });

    readButton.addEventListener("click", function () {
      let bookId = this.dataset.id;
      changeRead(bookId);
    });

    buttonDiv.append(deleteButton, readButton);

    card.append(title, author, numberOfPages, readStatus, buttonDiv);

    card.className = "card";

    main.appendChild(card);
  }
}

function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const numberOfPages = document.getElementById("pages").value;
  const read = document.querySelector(
    'input[name="readStatusRadio"]:checked'
  ).value;

  // add book to array with constructor
  myLibrary.push(new Book(title, author, numberOfPages, read));
  LibraryToMain(); // show books
}

function changeRead(bookId) {
  myLibrary[bookId].toggleRead();
  LibraryToMain();
}

function deleteBook(bookId) {
  if (bookId > -1) {
    // only splice array when item is found.
    myLibrary.splice(bookId, 1); // 2nd parameter means remove one item only
  }
  LibraryToMain();
}

function checkForm() {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const formError = document.getElementById("formError");

  if (title.validity.valid) {
    const titleError = document.createElement("p");
    titleError.textContent = "Missing Title";

    formError.append(titleError);
  }
  if (author.validity.valueMissing) {
    const authorError = document.createElement("p");
    authorError.textContent = "Missing Author";

    formError.append(authorError);
  }
  if (pages.validity.tooShort) {
    const pagesError = document.createElement("p");
    pagesError.textContent = "Pages need to be more than 0";

    formError.append(pagesError);
  }
  if (pages.validity.valueMissing) {
    const pagesMissingError = document.createElement("p");
    pagesMissingError.textContent = "Missing Number of Pages";

    formError.append(pagesMissingError);
  }
  return formError;
}
