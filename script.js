//Notes info I couldn't get it to remove the book we added but I made remove button and toggle read functionality
//Whenever I add a book the book gets displayed in our library
//Shows if we read or not depending if we check the read checkbox
//I try to show the hobbit example but it doesn't show when I run
//Our book function
function Book(author, pages, title, readStatus) {
    if (!new.target) {
        throw Error( "Use 'NEW' if creating a Book");
    }
    this.author = author;
    this.pages = pages;
    this.title = title;
    this.readStatus = readStatus;
} 

//define container our form and inputs
const bookContainer = document.getElementById("book-container");
const form = document.getElementById("book-form");
const authorInput = document.getElementById("author")
const pagesInput = document.getElementById("pages");
const titleInput = document.getElementById("title");
const readStatusInput = document.getElementById("read");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let author = authorInput.value;
    let pages = pagesInput.value;
    let title = titleInput.value;
    let readStatus = readStatusInput.checked;
    addBook(new Book(author, pages, title, readStatus));
    form.reset();
});
//prototype methods more efficient for us to read our function to see 
// and toggle read status
Book.prototype.toggleRead = function () {
    this.readStatus = !this.readStatus;
};
Book.prototype.info = function() {
    let status;
    if (this.readStatus) {
        status = "read";
    } else {
        status = "not read yet";
    }
    return 
    this.title + "by" +
    this.author + "," +
    this.pages + "pg," +
    status;
    };
    //our function to render our library
function renderLibrary() {
    // adding some innerhtml here to map our books to i
  bookContainer.innerHTML = myLibrary.map((book, i) => `
    <div class="card">
      <h4>${book.title}</h4>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.readStatus ? "Read" : "Not Read"}</p>
      <button class="toggle-btn" data-index="${i}">Toggle Read</button>
      <button class="remove-btn" data-index="${i}">Remove</button>
    </div>
  `).join("");
}
    //our array library
    const myLibrary = []
//Now we add books through our 
// helper functionality and push the book to our library when we add
function addBook(book){
    myLibrary.push(book)
    renderLibrary();
}
addBook(new Book( author, pages, title,readStatus));

//had trouble trying to toggle read and
//  remove buttons with event delegation so this part is chatgpt generated
// we are trying to listen to any click inside our bookcontainer
bookContainer.addEventListener("click", (e) => {
    //remember here we convert to number
    const index = Number(e.target.dataset.index);
    //e is our event object and our target is the element that was clicked
    if (e.target.classList.contains("toggle-btn")) {
        //we are getting a value from the data index for clicked element
        //if elemtn was clicked then we call method for that book
        //and then we render it so it can show and run
        myLibrary[index].toggleRead();
    renderLibrary();
  }
//note we start at position index
  if (e.target.classList.contains("remove-btn")) {
    myLibrary.splice(index, 1);
    renderLibrary();
  }
    
});

//add the book
//using example from our notes
const theHobbit = new Book(
  'The Hobbit',
  'J.R.R. Tolkien',
  295,
  false
);
addBook(theHobbit);
/* chatgpt suggestions
const bookContainer = document.getElementById("book-container");
function renderLibrary(){
    bookContainer.innerHTML = "";
    myLibrary.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h4>${book.title}</h4>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.isRead ? "Read" : "Not Read"}</p>
      <button data-index="${index}" class="toggle-btn">Toggle Read</button>
      <button data-index="${index}" class="remove-btn">Remove</button>
    `;

    bookContainer.appendChild(card);
  });
}
*/

/* notes for my homework notes from slides
const playerOne = {
  name: "tim",
  marker: "X"
};

const playerTwo = {
  name: "jenn",
  marker: "O"
};

console.log(playerOne.name);
console.log(playerTwo.name);
// Can write generic functions
function printName(player) {
  console.log(player.name);
}

printName(playerOne);  // "tim"
printName(playerTwo);  // "jenn"

// Works with any player!
function gameOver(winningPlayer) {
  console.log("Congratulations!");
  console.log(winningPlayer.name + " is the winner!");
}
// Constructor function (uppercase by convention)
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

// Create instances with 'new' keyword
const player1 = new Player('steve', 'X');
const player2 = new Player('also steve', 'O');

console.log(player1.name);  // 'steve'
console.log(player2.marker); // 'O'
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.sayName = function() {
    console.log(this.name);
  };
}

player1.sayName(); // logs 'steve'
player2.sayName(); // logs 'also steve'
function Player(name, marker) {
  // Guard against missing 'new' keyword
  if (!new.target) {
    throw Error("You must use 'new' to call the constructor");
  }

  this.name = name;
  this.marker = marker;
  this.sayName = function() {
    console.log(this.name);
  };
}

// This works
const player = new Player('steve', 'X');

// This throws an error
const oops = Player('steve', 'X'); // Error!
// Expected usage:
//const theHobbit = new Book(
//  'The Hobbit',
//  'J.R.R. Tolkien',
//  295,
//  false
//);

console.log(theHobbit.info());
// "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}


// Check the prototype
Object.getPrototypeOf(player1) === Player.prototype; // true
Object.getPrototypeOf(player2) === Player.prototype; // true
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

// Define method on prototype (shared by all instances)
Player.prototype.sayHello = function() {
  console.log("Hello, I'm a player!");
};

player1.sayHello(); // "Hello, I'm a player!"
player2.sayHello(); // "Hello, I'm a player!"
Player.prototype;  // Constructor's prototype property
Object.getPrototypeOf(player1);  // Instance's [[Prototype]]

Object.getPrototypeOf(player1) === Player.prototype; // true!
// Where did this come from?
player1.valueOf(); // Object { name: "steve", marker: "X" }

// It's inherited from Object.prototype!
player1.hasOwnProperty('valueOf'); // false
Object.prototype.hasOwnProperty('valueOf'); // true

// Check the prototype chain
Object.getPrototypeOf(Player.prototype) === Object.prototype;
// true!
function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function() {
  console.log(`Hello, I'm ${this.name}!`);
};

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

Player.prototype.getMarker = function() {
  console.log(`My marker is '${this.marker}'`);
};

// Make Player inherit from Person
Object.setPrototypeOf(Player.prototype, Person.prototype);
// Methods from Person
player1.sayName();      // Hello, I'm steve!
player2.sayName();      // Hello, I'm also steve!

// Methods from Player
player1.getMarker();    // My marker is 'X'
player2.getMarker();    // My marker is 'O'
function Player(name, marker) {
  this.name = name;        // 'this' = new object being created
  this.marker = marker;
}

Player.prototype.sayName = function() {
  console.log(this.name);  // 'this' = object calling the method
};

player1.sayName();  // 'this' refers to player1 */