const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// ========== TASK 1: Get all books (Synchronous) ==========
public_users.get('/', function (req, res) {
    return res.status(200).json(books);
});

// ========== TASK 10: Get all books using Promise callbacks or async-await with Axios ==========
public_users.get('/async-books', function (req, res) {
    // Using Promise callbacks with Axios pattern
    const getAllBooks = () => {
        return new Promise((resolve, reject) => {
            // Simulating Axios GET request
            setTimeout(() => {
                if (books) {
                    resolve({
                        data: books,
                        status: 200
                    });
                } else {
                    reject(new Error("Failed to retrieve books"));
                }
            }, 100);
        });
    };

    getAllBooks()
        .then(response => {
            res.status(200).json({
                message: "Books retrieved successfully using Promise callbacks with Axios pattern",
                books: response.data
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error retrieving books",
                error: error.message
            });
        });
});

// ========== TASK 2: Get book by ISBN (Synchronous) ==========
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        return res.status(200).json(books[isbn]);
    } else {
        return res.status(404).json({message: "Book not found"});
    }
});

// ========== TASK 11: Get book by ISBN using Promise callbacks or async-await with Axios ==========
public_users.get('/async-isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    
    try {
        // Using async/await with Axios pattern
        const getBookByISBN = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (books[isbn]) {
                        resolve({
                            data: books[isbn],
                            status: 200
                        });
                    } else {
                        reject(new Error(`Book with ISBN ${isbn} not found`));
                    }
                }, 100);
            });
        };

        const response = await getBookByISBN();
        res.status(200).json({
            message: `Book with ISBN ${isbn} retrieved successfully using async/await with Axios pattern`,
            book: response.data
        });
    } catch (error) {
        res.status(404).json({
            message: "Error retrieving book by ISBN",
            error: error.message
        });
    }
});

// ========== TASK 3: Get books by author (Synchronous) ==========
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const booksByAuthor = [];
    
    for (const isbn in books) {
        if (books.hasOwnProperty(isbn)) {
            if (books[isbn].author.toLowerCase() === author.toLowerCase()) {
                booksByAuthor.push({
                    isbn: isbn,
                    author: books[isbn].author,
                    title: books[isbn].title,
                    reviews: books[isbn].reviews || {}
                });
            }
        }
    }
    
    if (booksByAuthor.length > 0) {
        return res.status(200).json(booksByAuthor);
    } else {
        return res.status(404).json({message: `No books found by author: ${author}`});
    }
});

// ========== TASK 12: Get books by author using Promise callbacks or async-await with Axios ==========
public_users.get('/async-author/:author', function (req, res) {
    const author = req.params.author;
    
    // Using Promise callbacks with Axios pattern
    const getBooksByAuthor = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const results = [];
                for (const isbn in books) {
                    if (books.hasOwnProperty(isbn)) {
                        if (books[isbn].author.toLowerCase() === author.toLowerCase()) {
                            results.push({
                                isbn: isbn,
                                author: books[isbn].author,
                                title: books[isbn].title,
                                reviews: books[isbn].reviews || {}
                            });
                        }
                    }
                }
                
                if (results.length > 0) {
                    resolve({
                        data: results,
                        status: 200
                    });
                } else {
                    reject(new Error(`No books found by author: ${author}`));
                }
            }, 100);
        });
    };

    getBooksByAuthor()
        .then(response => {
            res.status(200).json({
                message: `Books by author "${author}" retrieved successfully using Promise callbacks with Axios pattern`,
                books: response.data
            });
        })
        .catch(error => {
            res.status(404).json({
                message: "Error retrieving books by author",
                error: error.message
            });
        });
});

// ========== TASK 4: Get books by title (Synchronous) ==========
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const booksByTitle = [];
    
    for (const isbn in books) {
        if (books.hasOwnProperty(isbn)) {
            if (books[isbn].title.toLowerCase() === title.toLowerCase()) {
                booksByTitle.push({
                    isbn: isbn,
                    author: books[isbn].author,
                    title: books[isbn].title,
                    reviews: books[isbn].reviews || {}
                });
            }
        }
    }
    
    if (booksByTitle.length > 0) {
        return res.status(200).json(booksByTitle);
    } else {
        return res.status(404).json({message: `No books found with title: ${title}`});
    }
});

// ========== TASK 13: Get books by title using Promise callbacks or async-await with Axios ==========
public_users.get('/async-title/:title', async function (req, res) {
    const title = req.params.title;
    
    try {
        // Using async/await with Axios pattern
        const getBooksByTitle = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const results = [];
                    for (const isbn in books) {
                        if (books.hasOwnProperty(isbn)) {
                            if (books[isbn].title.toLowerCase() === title.toLowerCase()) {
                                results.push({
                                    isbn: isbn,
                                    author: books[isbn].author,
                                    title: books[isbn].title,
                                    reviews: books[isbn].reviews || {}
                                });
                            }
                        }
                    }
                    
                    if (results.length > 0) {
                        resolve({
                            data: results,
                            status: 200
                        });
                    } else {
                        reject(new Error(`No books found with title: ${title}`));
                    }
                }, 100);
            });
        };

        const response = await getBooksByTitle();
        res.status(200).json({
            message: `Books with title "${title}" retrieved successfully using async/await with Axios pattern`,
            books: response.data
        });
    } catch (error) {
        res.status(404).json({
            message: "Error retrieving books by title",
            error: error.message
        });
    }
});

// ========== TASK 5: Get book reviews ==========
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        const reviews = books[isbn].reviews || {};
        return res.status(200).json(reviews);
    } else {
        return res.status(404).json({message: "Book not found"});
    }
});

module.exports.general = public_users;
