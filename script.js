let myLibrary = []; 

function Book(title, author, genre, pages, read = false) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.status = function() {
    if (this.read) return "read";
    else return "unread";
}


Book.prototype.changeStatus = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, genre, pages, read) {
    let book = new Book(title, author, genre, pages, read); 
    myLibrary.push(book); 
}

addBookToLibrary("The Midnight Library", "Matt Haig", "Fiction, Fantasy", "300", true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", "Fiction, Classic", "324");


function displayLibrary() {
    let bookshelf = document.getElementById("bookshelf"); 
    bookshelf.innerHTML = "";
    myLibrary.forEach((book) => {
        // Create the card container
        let card = document.createElement("div"); 
        card.setAttribute("class", "card");

        // Create and append the title element
        let title = document.createElement("div");
        title.setAttribute("class", "title");
        title.innerText = book.title;
        card.appendChild(title);

        // Create and append the author element
        let author = document.createElement("div");
        author.innerText = `Author: ${book.author}`;
        card.appendChild(author);

        // Create and append the genre element
        let genre = document.createElement("div");
        genre.innerText = `Genre: ${book.genre}`;
        card.appendChild(genre);

        // Create and append the pages element
        let pages = document.createElement("div");
        pages.innerText = `Pages: ${book.pages}`;
        card.appendChild(pages);

        let read = document.createElement("button"); 
        read.innerText = book.status();
        read.addEventListener("click", (e) => {
            book.changeStatus();
            read.innerText = book.status();
        });
        read.setAttribute("class", "remove");
        card.appendChild(read);

        // Create the remove button
        let remove = document.createElement("button"); 
        remove.innerText = "Remove";
        remove.setAttribute("data-id", book.id);
        remove.addEventListener("click", (e) => {
            let bookId = e.target.getAttribute("data-id"); 
            removeBook(bookId); 
        });
        remove.setAttribute("class", "remove");

        // Append the remove button to the card
        card.appendChild(remove);

        // Append the card to the bookshelf
        bookshelf.appendChild(card);
    });
}

function removeBook(id) {
    console.log(id);
    
    myLibrary = myLibrary.filter( (book) => {
        return book.id != id;
    });
    displayLibrary();
}

displayLibrary();

const showButton = document.querySelector("dialog + button");
const closeButton = document.getElementById("closeBtn"); 
const dialog = document.querySelector("dialog");
showButton.addEventListener("click", (e) =>{
    dialog.showModal();
});
closeButton.addEventListener("click", (e)=>{
    dialog.close();
});

const submit = document.getElementById("submit"); 
const titleInput = document.getElementById("title"); // Title input
const authorInput = document.getElementById("author"); // Author input
const genreInput = document.getElementById("genre"); // Genre input
const pagesInput = document.getElementById("pages"); // Pages input
const myForm  = document.getElementById("myForm");
myForm.addEventListener("submit", (e) => {
    if (myForm.checkValidity()) {
        e.preventDefault();
        const title = titleInput.value;
        const author = authorInput.value;
        const genre = genreInput.value;
        const pages = pagesInput.value;
        const selectedOption = document.querySelector('input[name="choice"]:checked');
        console.log(selectedOption.getAttribute("id"));
        
        addBookToLibrary(title, author, genre, pages, selectedOption.getAttribute("id") == "yes");
        displayLibrary();
        
        titleInput.value = "";
        authorInput.value = "";
        genreInput.value = "";
        pagesInput.value = "";
    
        dialog.close();
    }
});

