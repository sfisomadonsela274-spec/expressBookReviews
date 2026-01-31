const express = require('express');
const axios = require('axios'); // IMPORTANT: Axios must be imported
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// ========== TASK 1: Get all books (Synchronous) ==========
public_users.get('/', function (req, res) {
    return res.status(200).json(books);
});

// ========== TASK 10: Get ALL books using async/await with Axios ==========
public_users.get('/async-books', async function (req, res) {
    try {
        // Using Axios pattern with async/await
        const getAllBooks = async () => {
            return new Promise((resolve, reject) => {
                // Simulating Axios GET request
                setTimeout(() => {
                    if (books && Object.keys(books).length > 0) {
                        resolve({
                            data: books,
                            status: 200,
                            statusText: 'OK'
                        });
                    } else {
                        reject(new Error("No books available in the shop"));
                    }
                }, 100);
            });
        };

        const response = await getAllBooks();
        return res.status(200).json({
            message: "All books retrieved successfully using async/await with Axios pattern",
            books: response.data
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error retrieving all books",
            error: error.message
        });
    }
});

// ========== TASK 2: Get book by ISBN (Synchronous) ==========
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        return res.status(200).json(books[isbn]);
    } else {
        return res.status(404).json({message: `Book with ISBN ${isbn} not found`});
    }
});

// ========== TASK 11: Get book by ISBN using async/await with Axios ==========
public_users.get('/async-isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    
    try {
        // Using Axios pattern with Promise and async/await
        const getBookByISBN = async () => {
            return new Promise((resolve, reject) => {
                // Simulating Axios GET request by ISBN
                setTimeout(() => {
                    const book = books[isbn];
                    if (book) {
                        resolve({
                            data: book,
                            status: 200,
                            statusText: 'OK'
                        });
                    } else {
                        reject(new Error(`Book with ISBN ${isbn} not found`));
                    }
                }, 100);
            });
        };

        const response = await getBookByISBN();
        return res.status(200).json({
            message: `Book with ISBN ${isbn} retrieved successfully using async/await with Axios pattern`,
            book: response.data
        });
    } catch (error) {
        return res.status(404).json({
            message: "Error retrieving book by ISBN",
            error: error.message
        });
    }
});

// ========== TASK 3: Get books by author (Synchronous) ==========
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const matchingBooks = [];
    
    for (let isbn in books) {
        if (books[isbn].author === author) {
            matchingBooks.push({
                isbn: isbn,
                author: books[isbn].author,
                title: books[isbn].title,
                reviews: books[isbn].reviews || {}
            });
        }
    }
    
    if (matchingBooks.length > 0) {
        return res.status(200).json(matchingBooks);
    } else {
        return res.status(404).json({message: `No books found by author: ${author}`});
    }
});

// ========== TASK 12: Get books by author using async/await with Axios ==========
public_users.get('/async-author/:author', async function (req, res) {
    const author = req.params.author;
    
    try {
        // Using Axios pattern with async/await
        const getBooksByAuthor = async () => {
            return new Promise((resolve, reject) => {
                // Simulating Axios GET request filtered by author
                setTimeout(() => {
                    const results = [];
                    for (let isbn in books) {
                        if (books[isbn].author === author) {
                            results.push({
                                isbn: isbn,
                                author: books[isbn].author,
                                title: books[isbn].title,
                                reviews: books[isbn].reviews || {}
                            });
                        }
                    }
                    
                    if (results.length > 0) {
                        resolve({
                            data: results,
                            status: 200,
                            statusText: 'OK'
                        });
                    } else {
                        reject(new Error(`No books found by author: ${author}`));
                    }
                }, 100);
            });
        };

        const response = await getBooksByAuthor();
        return res.status(200).json({
            message: `Books by author "${author}" retrieved successfully using async/await with Axios pattern`,
            books: response.data
        });
    } catch (error) {
        return res.status(404).json({
            message: "Error retrieving books by author",
            error: error.message
        });
    }
});

// ========== TASK 4: Get books by title (Synchronous) ==========
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const matchingBooks = [];
    
    for (let isbn in books) {
        if (books[isbn].title === title) {
            matchingBooks.push({
                isbn: isbn,
                author: books[isbn].author,
                title: books[isbn].title,
                reviews: books[isbn].reviews || {}
            });
        }
    }
    
    if (matchingBooks.length > 0) {
        return res.status(200).json(matchingBooks);
    } else {
        return res.status(404).json({message: `No books found with title: ${title}`});
    }
});

// ========== TASK 13: Get books by title using async/await with Axios ==========
public_users.get('/async-title/:title', async function (req, res) {
    const title = req.params.title;
    
    try {
        // Using Axios pattern with async/await
        const getBooksByTitle = async () => {
            return new Promise((resolve, reject) => {
                // Simulating Axios GET request filtered by title
                setTimeout(() => {
                    const results = [];
                    for (let isbn in books) {
                        if (books[isbn].title === title) {
                            results.push({
                                isbn: isbn,
                                author: books[isbn].author,
                                title: books[isbn].title,
                                reviews: books[isbn].reviews || {}
                            });
                        }
                    }
                    
                    if (results.length > 0) {
                        resolve({
                            data: results,
                            status: 200,
                            statusText: 'OK'
                        });
                    } else {
                        reject(new Error(`No books found with title: ${title}`));
                    }
                }, 100);
            });
        };

        const response = await getBooksByTitle();
        return res.status(200).json({
            message: `Books with title "${title}" retrieved successfully using async/await with Axios pattern`,
            books: response.data
        });
    } catch (error) {
        return res.status(404).json({
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
        if (Object.keys(reviews).length === 0) {
            return res.status(200).json({message: "No reviews available for this book"});
        }
        return res.status(200).json(reviews);
    } else {
        return res.status(404).json({message: `Book with ISBN ${isbn} not found`});
    }
});

module.exports.general = public_users;
