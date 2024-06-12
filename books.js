function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = () =>{
        return (`${this.title} by ${this.author}, ${this.pages}pages, ${this.read}`)
    }
}

var TheHobbit = new Book("The Hobbit", "J.R.R Tolkien", 294, "read")
console.log(TheHobbit.info())

var HumptyDumpty = new Book("Humpty Dumpty", "Mr Egg", 15, "not read yet")
console.log(HumptyDumpty.info())