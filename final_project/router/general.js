// general.js - Update with all tasks 1-5 and 10-13

const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 1: Get all books (Synchronous version)
public_users.get('/', function (req, res) {
    res.send(JSON.stringify(books, null, 4));
});

// Task 10: Get all books using Async/Await with Promise
public_users.get('/async-books', async function (req, res) {
    try {
        const booksData = await new Promise((resolve, reject) => {
            // Simulate async operation
            setTimeout(() => {
                resolve(books);
            }, 100);
        });
        res.send(JSON.stringify(booksData, null, 4));
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// Task 2: Get book by ISBN (Synchronous version)
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    
    if (book) {
        res.send(JSON.stringify(book, null, 4));
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Task 11: Get book by ISBN using Async/Await with Promise
public_users.get('/async-isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    
    try {
        const book = await new Promise((resolve, reject) => {
            setTimeout(() => {
                const foundBook = books[isbn];
                if (foundBook) {
                    resolve(foundBook);
                } else {
                    reject(new Error("Book not found"));
                }
            }, 100);
        });
        res.send(JSON.stringify(book, null, 4));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Task 3: Get books by author (Synchronous version)
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const matchingBooks = [];
    
    for (let isbn in books) {
        if (books[isbn].author === author) {
            matchingBooks.push({ isbn: isbn, ...books[isbn] });
        }
    }
    
    if (matchingBooks.length > 0) {
        res.send(JSON.stringify(matchingBooks, null, 4));
    } else {
        res.status(404).json({ message: "No books found by this author" });
    }
});

// Task 12: Get books by author using Async/Await with Promise
public_users.get('/async-author/:author', async function (req, res) {
    const author = req.params.author;
    
    try {
        const matchingBooks = await new Promise((resolve, reject) => {
            setTimeout(() => {
                const results = [];
                for (let isbn in books) {
                    if (books[isbn].author === author) {
                        results.push({ isbn: isbn, ...books[isbn] });
                    }
                }
                if (results.length > 0) {
                    resolve(results);
                } else {
                    reject(new Error("No books found by this author"));
                }
            }, 100);
        });
        res.send(JSON.stringify(matchingBooks, null, 4));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Task 4: Get books by title (Synchronous version)
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const matchingBooks = [];
    
    for (let isbn in books) {
        if (books[isbn].title === title) {
            matchingBooks.push({ isbn: isbn, ...books[isbn] });
        }
    }
    
    if (matchingBooks.length > 0) {
        res.send(JSON.stringify(matchingBooks, null, 4));
    } else {
        res.status(404).json({ message: "No books found with this title" });
    }
});

// Task 13: Get books by title using Async/Await with Promise
public_users.get('/async-title/:title', async function (req, res) {
    const title = req.params.title;
    
    try {
        const matchingBooks = await new Promise((resolve, reject) => {
            setTimeout(() => {
                const results = [];
                for (let isbn in books) {
                    if (books[isbn].title === title) {
                        results.push({ isbn: isbn, ...books[isbn] });
                    }
                }
                if (results.length > 0) {
                    resolve(results);
                } else {
                    reject(new Error("No books found with this title"));
                }
            }, 100);
        });
        res.send(JSON.stringify(matchingBooks, null, 4));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Task 5: Get book reviews
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    
    if (book && book.reviews) {
        res.send(JSON.stringify(book.reviews, null, 4));
    } else if (book) {
        res.send(JSON.stringify({ message: "No reviews found for this book" }, null, 4));
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;
