const myLibrary=[];
const cardSection = document.querySelector("div#card-wrapper");

function Book(title, author, pages, read, note) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.note = note;
    this.hslAngle= Math.floor(Math.random()*361);
    this.info = `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}. Note: "${note}". ID: ${this.id}`
}
function addBookToLibrary(title, author, pages, read, note) {
    const newBook = new Book(title, author, pages, read, note);
    myLibrary.unshift(newBook);
    createShelves();
}

let cards;

function removePreviousCards() {
    cards = document.querySelectorAll("div.book-div");
    cards.forEach((item)=> {item.remove()});
}

let shelves = [];
let numberOfShelves;

function createShelves() {
    const myLibraryCopy = [...myLibrary];
    numberOfShelves = (Math.ceil(myLibrary.length/4));
    for (i=1; i<=numberOfShelves; i++) {
        shelves[i] = myLibraryCopy.splice(0,4);
    }
}

let cardPage = 1;

function updateCards() {
    if (cardPage>numberOfShelves) {
        toPreviousPage();
    }
    removePreviousCards();
    
    let currentShelf = shelves[cardPage];
    if (currentShelf===0) return;
    currentShelf.forEach((item) => {
    const book = document.createElement("article");
    book.classList.add("card");

    bookTitle = document.createElement("p");
    bookTitle.textContent = item.title;
    book.appendChild(bookTitle);
    bookAuthor=document.createElement("p");
    bookAuthor.textContent=item.author;
    book.appendChild(bookAuthor);
    pageCount=document.createElement("p");
    pageCount.textContent=`${item.pages} pages`;
    book.appendChild(pageCount)

    bookNote=document.createElement("p");
    bookNote.classList.add("note");
    bookNote.textContent=`"${item.note}"`;
    book.appendChild(bookNote);

    readStatus=document.createElement("p");
    readStatus.textContent=item.read;
        if (item.read==="read") {
            readStatus.className==="read";
        }
        else {
            readStatus.className="not-read"
        }
    book.appendChild(readStatus);

    const editButtons = document.createElement("div");
    editButtons.classList.add("edit");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete")
    deleteButton.textContent="x";
    deleteButton.id = item.id;
    editButtons.appendChild(deleteButton);
    // book.appendChild(editButtons)
    
    book.style.backgroundColor=`hsl(${item.hslAngle}, 50%, 75%)`;
    
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-div");
    bookDiv.id = item.id;

    bookDiv.appendChild(book);
    bookDiv.appendChild(editButtons);

    cardSection.appendChild(bookDiv);
    })
    const allDeleteButtons = document.querySelectorAll("button.delete");
    allDeleteButtons.forEach((item) => {
        item.addEventListener("click", () => {
            deleteBook(item.id)
            })
        })

        checkButtons()

        console.log(myLibrary)
        console.log(shelves)
        console.log(`# of shelves: ${numberOfShelves} / total books: ${myLibrary.length}`)
        console.log(`Card page: ${cardPage}`)
    }
// const deleteBookButtons = document.querySelectorAll(".delete");

function deleteBook(idToDelete) {
    console.log(idToDelete)
    myLibrary.forEach((item) => {
        // function findShelfLocation(item, shelf) {
        //     if (shelves
        // }
        if (item.id === idToDelete) {
            const itemIndex = myLibrary.indexOf(item);
                
            myLibrary.splice(itemIndex, 1);

            console.log(`Deleted ${item.title}: ${item.id}`)
            shelves.length=0;
            createShelves();
            updateCards();
            }
        })
}

const pageDisplay = document.getElementById("pageNumber");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const pageButtons = document.getElementById("page-wrapper");
const noteToggle = document.getElementById("toggle-notes")

pageButtons.addEventListener("click", () => {
    switch (event.target.id) {
        case "previous":
            toPreviousPage();
            break
        case "next":
            toNextPage();
            break;
        case "toggle-notes":
            toggleNotes();
            break;
    }
})
    function toPreviousPage() {
        if (cardPage===1) return;
        else {
        cardPage--; 
        updatePage();
        updateCards();
        }
    }
    function toNextPage() {
        if (cardPage === numberOfShelves) return;
        else {
        cardPage++;
        updatePage(); 
        updateCards();
        }
    }
    function updatePage() {
        pageDisplay.textContent = cardPage;
    }
    function toggleNotes() {
        cardSection.classList.toggle("toggle-notes");
    }

function checkButtons() {
    if (cardPage===1) {
        previousButton.style.opacity = 0.3;
    }
    else previousButton.style.opacity = 0.7;
    if (cardPage===numberOfShelves) {
        nextButton.style.opacity = 0.3;
    }
    else nextButton.style.opacity=0.7;
}

const bookForm = document.getElementById("bookform");
const createBookButton = document.querySelector("button#create");

createBookButton.addEventListener("click", () => {
    event.preventDefault();
    createBookFromForm()
}
)

function createBookFromForm() {
    const readOrNot = function() {
        if (bookForm.read.value==="Yes") {
            return "read"
        }
        else if (bookForm.notread.value==="No") {
            return "not read"
        }
    }
    // title, author, pages, read, note
    addBookToLibrary(bookForm.title.value, bookForm.author.value, bookForm.pages.value, readOrNot(), bookForm.note.value)
    updateCards()
    bookForm.reset();
}

addBookToLibrary("1", "bob", "5", "read", "just trash");
addBookToLibrary("2", "Robert", "6", "read", "still trash");
addBookToLibrary("3", "Place Holder", "1213", "not read", "what");
addBookToLibrary("4", "Place Holder", "5678", "not read", "reconsidering");
addBookToLibrary("5", "Place Holder", "2", "not read", "wouldn't take long");
updateCards()


