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
        this.showDialog();
        
    }

    showDialog() {
        const addBtn = document.querySelector(".add-manga");
        const dialog = document.querySelector("#mangaDialog");
        const form = document.querySelector("#mangaForm");
        const closeBtn = document.querySelector("#closeBtn");

        // Show dialog when "Add Manga" button is clicked
        addBtn.addEventListener("click", () => {
            dialog.showModal();
        });

        // Close dialog without submitting
        closeBtn.addEventListener("click", () => {
            dialog.close();
        });

        // Handle form submission
        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent default form submission

            // Get form data
            const formData = new FormData(form);
            const title = formData.get("title");
            const author = formData.get("author");
            const chapters = parseInt(formData.get("chapters"));
            const coverImage = formData.get("coverImage") || ""; // Default to empty string if not provided
            const description = formData.get("description") || ""; // Default to empty string
            const read = formData.get("read") === "true"; // Convert string to boolean

            // Add manga to library and update UI
            this.library.addManga(title, author, chapters, coverImage, description, read);
            this.render();
            dialog.close(); // Close dialog after adding
            form.reset(); // Clear form for next use
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
