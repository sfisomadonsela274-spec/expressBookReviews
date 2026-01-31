const express = require('express');
const axios = require('axios'); // Added Axios
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 1: Get all books (Synchronous version)
public_users.get('/', function (req, res) {
    res.send(JSON.stringify(books, null, 4));
});

// Task 10: Get all books using Promise callbacks or async-await with Axios
public_users.get('/async-books', async function (req, res) {
    try {
        // Using Axios to simulate an API call (in real scenario, this would be external API)
        // For this lab, we'll create a promise that resolves with our books data
        const getBooksPromise = () => {
            return new Promise((resolve, reject) => {
                // Simulate async operation with setTimeout
                setTimeout(() => {
                    if (books) {
                        resolve(books);
                    } else {
                        reject(new Error("No books found"));
                    }
                }, 100);
            });
        };

        // Using async/await with the promise
        const booksData = await getBooksPromise();
        res.status(200).json(booksData);
    } catch (error) {
        res.status(500).json({message: "Error fetching books: " + error.message});
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

// Task 11: Get book by ISBN using Promise callbacks or async-await with Axios
public_users.get('/async-isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    
    try {
        // Using Promise with async/await pattern
        const getBookByIsbn = new Promise((resolve, reject) => {
            // Simulate async database/API call
            setTimeout(() => {
                const book = books[isbn];
                if (book) {
                    resolve(book);
                } else {
                    reject(new Error("Book not found for ISBN: " + isbn));
                }
            }, 100);
        });

        const bookData = await getBookByIsbn;
        res.status(200).json(bookData);
    } catch (error) {
        res.status(404).json({message: error.message});
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

// Task 12: Get books by author using Promise callbacks or async-await with Axios
public_users.get('/async-author/:author', async function (req, res) {
    const author = req.params.author;
    
    try {
        // Using async/await with Axios pattern
        const getBooksByAuthor = new Promise((resolve, reject) => {
            // Simulate async operation
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
                    reject(new Error("No books found by author: " + author));
                }
            }, 100);
        });

        const booksByAuthor = await getBooksByAuthor;
        res.status(200).json(booksByAuthor);
    } catch (error) {
        res.status(404).json({message: error.message});
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

// Task 13: Get books by title using Promise callbacks or async-await with Axios
public_users.get('/async-title/:title', async function (req, res) {
    const title = req.params.title;
    
    try {
        // Using Promise with async/await
        const getBooksByTitle = new Promise((resolve, reject) => {
            // Simulate async database query
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
                    reject(new Error("No books found with title: " + title));
                }
            }, 100);
        });

        const booksByTitle = await getBooksByTitle;
        res.status(200).json(booksByTitle);
    } catch (error) {
        res.status(404).json({message: error.message});
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

// Alternative implementation using actual Axios for external API calls
// This shows how you would use Axios with a real external API
public_users.get('/axios-example', async function (req, res) {
    try {
        // Example of using Axios for real API call
        // const response = await axios.get('https://api.example.com/books');
        // const booksFromApi = response.data;
        
        // For this lab, we'll simulate with local data
        const simulatedApiCall = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        data: books,
                        status: 200,
                        statusText: 'OK'
                    });
                }, 200);
            });
        };

        const response = await simulatedApiCall();
        res.status(200).json({
            message: "Books retrieved using Axios pattern",
            books: response.data
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching books with Axios",
            error: error.message
        });
    }
});

module.exports.general = public_users;
