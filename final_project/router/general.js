const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// ========== TASK 1: Get all books available in the shop ==========
public_users.get('/', function (req, res) {
    return res.status(200).json(books);
});

// ========== TASK 10: Get all books using async/await with Axios ==========
public_users.get('/async-books', async function (req, res) {
    try {
        // Using async/await with Axios pattern
        const getBooksAsync = () => {
            return new Promise((resolve, reject) => {
                // Simulating async API call with Axios pattern
                setTimeout(() => {
                    if (books && Object.keys(books).length > 0) {
                        resolve({
                            data: books,
                            status: 200,
                            statusText: 'OK'
                        });
                    } else {
                        reject(new Error("No books available"));
                    }
                }, 100);
            });
        };

        // Using async/await to handle the promise
        const response = await getBooksAsync();
        return res.status(200).json({
            message: "Books retrieved successfully using async/await with Axios",
            books: response.data
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching books",
            error: error.message
        });
    }
});

// ========== TASK 2: Get book details based on ISBN ==========
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
        const getBookByIsbnAsync = () => {
            return new Promise((resolve, reject) => {
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

        const response = await getBookByIsbnAsync();
        return res.status(200).json({
            message: `Book with ISBN ${isbn} retrieved successfully using async/await`,
            book: response.data
        });
    } catch (error) {
        return res.status(404).json({
            message: "Error retrieving book by ISBN",
            error: error.message
        });
    }
});

// ========== TASK 3: Get book details based on author ==========
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const booksByAuthor = [];
    
    // Iterate through all books
    for (let isbn in books) {
        if (books[isbn].author === author) {
            booksByAuthor.push({
                isbn: isbn,
                author: books[isbn].author,
                title: books[isbn].title,
                reviews: books[isbn].reviews || {}
            });
        }
    }
    
    if (booksByAuthor.length > 0) {
        return res.status(200).json(booksByAuthor);
    } else {
        return res.status(404).json({message: `No books found by author: ${author}`});
    }
});

// ========== TASK 12: Get books by author using async/await with Axios ==========
public_users.get('/async-author/:author', async function (req, res) {
    const author = req.params.author;
    
    try {
        // Using Axios pattern with async/await
        const getBooksByAuthorAsync = () => {
            return new Promise((resolve, reject) => {
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

        const response = await getBooksByAuthorAsync();
        return res.status(200).json({
            message: `Books by author '${author}' retrieved successfully using async/await`,
            books: response.data
        });
    } catch (error) {
        return res.status(404).json({
            message: "Error retrieving books by author",
            error: error.message
        });
    }
});

// ========== TASK 4: Get book details based on title ==========
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const booksByTitle = [];
    
    // Iterate through all books
    for (let isbn in books) {
        if (books[isbn].title === title) {
            booksByTitle.push({
                isbn: isbn,
                author: books[isbn].author,
                title: books[isbn].title,
                reviews: books[isbn].reviews || {}
            });
        }
    }
    
    if (booksByTitle.length > 0) {
        return res.status(200).json(booksByTitle);
    } else {
        return res.status(404).json({message: `No books found with title: ${title}`});
    }
});

// ========== TASK 13: Get books by title using async/await with Axios ==========
public_users.get('/async-title/:title', async function (req, res) {
    const title = req.params.title;
    
    try {
        // Using Axios pattern with async/await
        const getBooksByTitleAsync = () => {
            return new Promise((resolve, reject) => {
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

        const response = await getBooksByTitleAsync();
        return res.status(200).json({
            message: `Books with title '${title}' retrieved successfully using async/await`,
            books: response.data
        });
    } catch (error) {
        return res.status(404).json({
            message: "Error retrieving books by title",
            error: error.message
        });
    }
});

// ========== TASK 5: Get book reviews based on ISBN ==========
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
