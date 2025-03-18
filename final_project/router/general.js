//const Axios = require("axios")
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  // Check if both username and password are provided
  if (username && password) {
      // Check if the user does not already exist
      if (!doesExist(username)) {
          // Add the new user to the users array
          users.push({"username": username, "password": password});
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }
  // Return error if username or password is missing
  return res.status(404).json({message: "Unable to register user."});

 // return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
 
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here

    const isbn = req.params.isbn; // Retrieve the ISBN from the request parameters
    const booksArray = Object.values(books); // Convert books object to an array
    const book = booksArray.find(b => b.isbn === isbn); // Find the book with the matching ISBN

    if (book) {
        res.json(book); // Send the book details as a JSON response
    } else {
        res.status(404).json({ message: "Book not found" }); // Send a 404 response if the book is not found
    }
});

// return res.status(300).json({message: "Yet to be implemented"});
 
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author; // Retrieve the author from the request parameters
    const booksArray = Object.values(books); // Convert books object to an array
    const booksByAuthor = booksArray.filter(book => book.author === author); // Find all books by the given author

    if (booksByAuthor.length > 0) {
        res.json(booksByAuthor); // Send the list of books as a JSON response
    } else {
        res.status(404).json({ message: "No books found by this author" }); // Send a 404 response if no books are found
    }
 // return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
    const title = req.params.title; // Retrieve the title from the request parameters
    const booksArray = Object.values(books); // Convert books object to an array
    const book = booksArray.find(b => b.title === title); // Find the book with the matching title

    if (book) {
        res.json(book); // Send the book details as a JSON response
    } else {
        res.status(404).json({ message: "Book not found" }); // Send a 404 response if the book is not found
    }
});
 // return res.status(300).json({message: "Yet to be implemented"});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn; // Retrieve the ISBN from the request parameters
    const booksArray = Object.values(books); // Convert books object to an array
    const book = booksArray.find(b => b.isbn === isbn); // Find the book with the matching ISBN

    if (book && book.reviews) {
        res.json(book.reviews); // Send the book reviews as a JSON response
    } else {
        res.status(404).json({ message: "Reviews not found for this book" }); // Send a 404 response if reviews are not found
    }
 // return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
