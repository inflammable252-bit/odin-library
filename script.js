const myLibrary=[];
const cardSection = document.querySelector("div#card-wrapper");
let cardPage = 1;


function Book(title, author, pages, read, note) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.note = note;
    this.info = `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}. Note: "${note}". ID: ${this.id}`
}
function addBookToLibrary(title, author, pages, read, note) {
    const newBook = new Book(title, author, pages, read, note);
    myLibrary.push(newBook);
}

addBookToLibrary("bob's life", "bob", "5", "read", "just trash");
addBookToLibrary("Rob's Odyssey", "Robert", "6", "read", "still trash");
addBookToLibrary("Placeholder", "Place Holder", "1213", "not read", "what");
addBookToLibrary("Placeholding", "Place Holder", "5678", "not read", "reconsidering");
// addBookToLibrary("Placeholded", "Place Holder", "2", "not read", "wouldn't take long");

let cardDisplay = myLibrary.slice(0,4);

function updateCards() {
    myLibrary.forEach((item) => {
        const book = document.createElement("article");
        book.classList.add("card");

        bookTitle = document.createElement("p");
        bookTitle.textContent = item.title;
        book.appendChild(bookTitle);
        bookAuthor=document.createElement("p");
        bookAuthor.textContent=item.author;
        book.appendChild(bookAuthor);
        readStatus=document.createElement("p");
        readStatus.textContent=item.read;
            if (item.read==="read") {
                readStatus.className==="read";
            }
            else {
                readStatus.className="not-read"
            }
        book.appendChild(readStatus);

        cardSection.appendChild(book);
    })
}

function rightPage(a, b) {
    a =+ 5;
    b =+ 5;
    cardDisplay = myLibrary.slice(a,b)    
    cardPage++
}
function leftPage(a, b) {
    a =- 5;
    b =- 5;
    cardDisplay = myLibrary.slice(a,b)    
    cardPage--
}

console.log(myLibrary)
updateCards()
// console.log(cardDisplay)
