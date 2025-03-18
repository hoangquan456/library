class Manga { //need manga properties, an ID, and status
    constructor(title, author, chapters, coverImage, description, read = false) {
        this.title = title;
        this.author = author;
        this.chapters = chapters;
        this.coverImage = coverImage;
        this.description = description;
        this.read = read;
        this.id = crypto.randomUUID();
    }

    toggleReadStatus() {
        this.read = !this.read;
    }
}

class Library { //mangae all the manga in the library in console
    myLibrary = []; 

    addManga(title, author, chapters, coverImage, description, read) {
        this.myLibrary.push(new Manga(title, author, chapters, coverImage, description, read));
    }

    deleteManga(id) {
        this.myLibrary = this.myLibrary.filter( (manga) => {
            return manga.id != id; 
        })
    }
}

class UI { //control DOM and screen render   


    constructor(library) {
        this.library = library;
        let addbtn = document.querySelector(".add-manga"); 
        addbtn.addEventListener("click", ()=>{
            this.library.addManga("abc", "def");
            this.render();
        });
    }
    
    render() {
        let bookshelf = document.querySelector(".bookshelf"); 
        bookshelf.innerHTML="";
        this.library.myLibrary.forEach( (manga) => {
            let mangaTile = document.createElement("div");
            mangaTile.classList.add("tile");

            // Cover image
            let imageCover = document.createElement("img");
            imageCover.src = manga.coverImage || "https://via.placeholder.com/100"; // Fallback if no cover
            imageCover.alt = `${manga.title} cover`;
            mangaTile.appendChild(imageCover);

            // Content container
            let contentDiv = document.createElement("div");
            contentDiv.classList.add("content");

            // Title
            let title = document.createElement("h3");
            title.classList.add("title");
            title.textContent = manga.title;
            contentDiv.appendChild(title);

            // Info section
            let infoDiv = document.createElement("div");
            infoDiv.classList.add("info");

            // Author container
            let authorContainer = document.createElement("div");
            authorContainer.classList.add("container");
            let authorIcon = document.createElement("img");
            authorIcon.src = "./assets/users.svg";
            authorIcon.classList.add("svg");
            let authorText = document.createElement("div");
            authorText.textContent = manga.author;
            authorContainer.appendChild(authorIcon);
            authorContainer.appendChild(authorText);
            infoDiv.appendChild(authorContainer);

            // Chapters container
            let chaptersContainer = document.createElement("div");
            chaptersContainer.classList.add("container");
            let chaptersIcon = document.createElement("img");
            chaptersIcon.src = "./assets/hash-thin-svgrepo-com.svg";
            chaptersIcon.classList.add("svg");
            let chaptersText = document.createElement("div");
            chaptersText.textContent = manga.chapters;
            chaptersContainer.appendChild(chaptersIcon);
            chaptersContainer.appendChild(chaptersText);
            infoDiv.appendChild(chaptersContainer);

            contentDiv.appendChild(infoDiv);

            // Control section
            let controlDiv = document.createElement("div");
            controlDiv.classList.add("control");

            // Read status button
            let statusBtn = document.createElement("button");
            statusBtn.classList.add("read");
            statusBtn.textContent = manga.read ? "Read" : "Not Read"; // User-friendly text
            statusBtn.addEventListener("click", () => {
                manga.toggleReadStatus();
                this.render();
            });
            controlDiv.appendChild(statusBtn);

            // Remove button
            let removeBtn = document.createElement("button");
            removeBtn.classList.add("remove");
            removeBtn.textContent = "remove";
            removeBtn.addEventListener("click", () => {
                this.library.deleteManga(manga.id);
                this.render();
            });
            controlDiv.appendChild(removeBtn);

            contentDiv.appendChild(controlDiv);

            // Description
            let descriptionDiv = document.createElement("div");
            descriptionDiv.textContent = manga.description;
            contentDiv.appendChild(descriptionDiv);

            // Assemble the tile
            mangaTile.appendChild(contentDiv);
            bookshelf.appendChild(mangaTile);
        })
    }
}

let ui = new UI(new Library());
ui.library.addManga("Gintama", "Hideaki Sorachi", "702", "https://comicvine.gamespot.com/a/uploads/scale_small/6/67663/7022689-77.jpg", `In the alternate history of Edo-period Japan, where aliens called "Amanto" have taken over, Gintama follows the eccentric samurai Gintoki Sakata, his apprentice Shinpachi Shimura, and the strong alien girl Kagura, who form the "Yorozuya" (a handyman business) and take on odd jobs to survive. `);
ui.library.addManga("Attack on Titan", "Hajime Isayama", "139", "https://upload.wikimedia.org/wikipedia/en/d/d6/Shingeki_no_Kyojin_manga_volume_1.jpg", "In 100 years, humanity lives in fear of the Titans. A race of beasts who take the appearance of humans but are much larger and lack sexual organs. Their only purpose is to feast upon humans. However, humanity barricaded themselves in three 50-meter walls to protect themselves from the terror of the Titans.", true);
// console.log(ui.myLibrary);
ui.render(); 


// let myLibrary = []; 

// function Book(title, author, genre, pages, read = false) {
//     this.title = title;
//     this.author = author;
//     this.genre = genre;
//     this.pages = pages;
//     this.read = read;
//     this.id = crypto.randomUUID();
// }

// Book.prototype.status = function() {
//     if (this.read) return "read";
//     else return "unread";
// }


// Book.prototype.changeStatus = function() {
//     this.read = !this.read;
// }

// function addBookToLibrary(title, author, genre, pages, read) {
//     let book = new Book(title, author, genre, pages, read); 
//     myLibrary.push(book); 
// }

// addBookToLibrary("The Midnight Library", "Matt Haig", "Fiction, Fantasy", "300", true);
// addBookToLibrary("To Kill a Mockingbird", "Harper Lee", "Fiction, Classic", "324");


// function displayLibrary() {
//     let bookshelf = document.getElementById("bookshelf"); 
//     bookshelf.innerHTML = "";
//     myLibrary.forEach((book) => {
//         // Create the card container
//         let card = document.createElement("div"); 
//         card.setAttribute("class", "card");

//         // Create and append the title element
//         let title = document.createElement("div");
//         title.setAttribute("class", "title");
//         title.innerText = book.title;
//         card.appendChild(title);

//         // Create and append the author element
//         let author = document.createElement("div");
//         author.innerText = `Author: ${book.author}`;
//         card.appendChild(author);

//         // Create and append the genre element
//         let genre = document.createElement("div");
//         genre.innerText = `Genre: ${book.genre}`;
//         card.appendChild(genre);

//         // Create and append the pages element
//         let pages = document.createElement("div");
//         pages.innerText = `Pages: ${book.pages}`;
//         card.appendChild(pages);

//         let read = document.createElement("button"); 
//         read.innerText = book.status();
//         read.addEventListener("click", (e) => {
//             book.changeStatus();
//             read.innerText = book.status();
//         });
//         read.setAttribute("class", "remove");
//         card.appendChild(read);

//         // Create the remove button
//         let remove = document.createElement("button"); 
//         remove.innerText = "Remove";
//         remove.setAttribute("data-id", book.id);
//         remove.addEventListener("click", (e) => {
//             let bookId = e.target.getAttribute("data-id"); 
//             removeBook(bookId); 
//         });
//         remove.setAttribute("class", "remove");

//         // Append the remove button to the card
//         card.appendChild(remove);

//         // Append the card to the bookshelf
//         bookshelf.appendChild(card);
//     });
// }

// function removeBook(id) {
//     console.log(id);
    
//     myLibrary = myLibrary.filter( (book) => {
//         return book.id != id;
//     });
//     displayLibrary();
// }

// displayLibrary();

// const showButton = document.querySelector("dialog + button");
// const closeButton = document.getElementById("closeBtn"); 
// const dialog = document.querySelector("dialog");
// showButton.addEventListener("click", (e) =>{
//     dialog.showModal();
// });
// closeButton.addEventListener("click", (e)=>{
//     dialog.close();
// });

// const submit = document.getElementById("submit"); 
// const titleInput = document.getElementById("title"); // Title input
// const authorInput = document.getElementById("author"); // Author input
// const genreInput = document.getElementById("genre"); // Genre input
// const pagesInput = document.getElementById("pages"); // Pages input
// const myForm  = document.getElementById("myForm");
// myForm.addEventListener("submit", (e) => {
//     if (myForm.checkValidity()) {
//         e.preventDefault();
//         const title = titleInput.value;
//         const author = authorInput.value;
//         const genre = genreInput.value;
//         const pages = pagesInput.value;
//         const selectedOption = document.querySelector('input[name="choice"]:checked');
//         console.log(selectedOption.getAttribute("id"));
        
//         addBookToLibrary(title, author, genre, pages, selectedOption.getAttribute("id") == "yes");
//         displayLibrary();
        
//         titleInput.value = "";
//         authorInput.value = "";
//         genreInput.value = "";
//         pagesInput.value = "";
    
//         dialog.close();
//     }
// });

