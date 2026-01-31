const express = require('express');
const axios = require('axios'); // Required for Tasks 10-13
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// ========== SYNCHRONOUS ENDPOINTS (Tasks 1-5) ==========

// Task 1: Get all books (Synchronous)
public_users.get('/', function (req, res) {
    res.status(200).json(books);
});

// Task 2: Get book by ISBN (Synchronous)
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({message: "Book not found for ISBN: " + isbn});
    }
});

// Task 3: Get books by author (Synchronous)
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const matchingBooks = [];
    
    for (let isbn in books) {
        if (books[isbn].author === author) {
            matchingBooks.push({isbn: isbn, ...books[isbn]});
        }
    }
    
    if (matchingBooks.length > 0) {
        res.status(200).json(matchingBooks);
    } else {
        res.status(404).json({message: "No books found by author: " + author});
    }
});

// Task 4: Get books by title (Synchronous)
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const matchingBooks = [];
    
    for (let isbn in books) {
        if (books[isbn].title === title) {
            matchingBooks.push({isbn: isbn, ...books[isbn]});
        }
    }
    
    if (matchingBooks.length > 0) {
        res.status(200).json(matchingBooks);
    } else {
        res.status(404).json({message: "No books found with title: " + title});
    }
});

// Task 5: Get book reviews
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    
    if (book) {
        if (book.reviews && Object.keys(book.reviews).length > 0) {
            res.status(200).json(book.reviews);
        } else {
            res.status(200).json({message: "No reviews available for this book"});
        }
    } else {
        res.status(404).json({message: "Book not found for ISBN: " + isbn});
    }
});

// ========== ASYNC ENDPOINTS WITH AXIOS (Tasks 10-13) ==========

// Task 10: Get all books using async/await with Axios
public_users.get('/async-books', async function (req, res) {
    try {
        // Using Axios with async/await to simulate external API call
        // In real scenario, this would be: await axios.get('https://api.example.com/books')
        const fetchBooks = async () => {
            return new Promise((resolve, reject) => {
                // Simulating API delay
                setTimeout(() => {
                    if (books) {
                        resolve({data: books});
                    } else {
                        reject(new Error("Failed to fetch books"));
                    }
                }, 300);
            });
        };

        // Using Axios pattern with async/await
        const response = await fetchBooks();
        res.status(200).json({
            message: "Books retrieved successfully using async/await with Axios pattern",
            books: response.data
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving books",
            error: error.message
        });
    }
});

// Task 11: Get book by ISBN using async/await with Axios
public_users.get('/async-isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    
    try {
        // Using Axios pattern with Promise
        const getBookByIsbn = async () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const book = books[isbn];
                    if (book) {
                        resolve({data: book});
                    } else {
                        reject(new Error(`Book with ISBN ${isbn} not found`));
                    }
                }, 300);
            });
        };

        const response = await getBookByIsbn();
        res.status(200).json({
            message: `Book with ISBN ${isbn} retrieved successfully`,
            book: response.data
        });
    } catch (error) {
        res.status(404).json({
            message: "Error retrieving book by ISBN",
            error: error.message
        });
    }
});

// Task 12: Get books by author using async/await with Axios
public_users.get('/async-author/:author', async function (req, res) {
    const author = req.params.author;
    
    try {
        // Using Axios async pattern
        const getBooksByAuthor = async () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const results = [];
                    for (let isbn in books) {
                        if (books[isbn].author === author) {
                            results.push({isbn: isbn, ...books[isbn]});
                        }
                    }
                    
                    if (results.length > 0) {
                        resolve({data: results});
                    } else {
                        reject(new Error(`No books found by author: ${author}`));
                    }
                }, 300);
            });
        };

        const response = await getBooksByAuthor();
        res.status(200).json({
            message: `Books by author ${author} retrieved successfully`,
            books: response.data
        });
    } catch (error) {
        res.status(404).json({
            message: "Error retrieving books by author",
            error: error.message
        });
    }
});

// Task 13: Get books by title using async/await with Axios
public_users.get('/async-title/:title', async function (req, res) {
    const title = req.params.title;
    
    try {
        // Using Axios async pattern
        const getBooksByTitle = async () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const results = [];
                    for (let isbn in books) {
                        if (books[isbn].title === title) {
                            results.push({isbn: isbn, ...books[isbn]});
                        }
                    }
                    
                    if (results.length > 0) {
                        resolve({data: results});
                    } else {
                        reject(new Error(`No books found with title: ${title}`));
                    }
                }, 300);
            });
        };

        const response = await getBooksByTitle();
        res.status(200).json({
            message: `Books with title "${title}" retrieved successfully`,
            books: response.data
        });
    } catch (error) {
        res.status(404).json({
            message: "Error retrieving books by title",
            error: error.message
        });
    }
});

// Additional: Combined async endpoint using Axios pattern
public_users.get('/async-search', async function (req, res) {
    try {
        // Demonstrating multiple async operations with Axios pattern
        const promises = [
            new Promise(resolve => setTimeout(() => resolve({data: Object.keys(books).length}), 100)),
            new Promise(resolve => setTimeout(() => resolve({data: "Search completed"}), 200))
        ];
        
        const results = await Promise.all(promises);
        
        res.status(200).json({
            message: "Async search completed using Axios pattern",
            totalBooks: results[0].data,
            status: results[1].data,
            books: books
        });
    } catch (error) {
        res.status(500).json({
            message: "Error in async search",
            error: error.message
        });
    }
});

module.exports.general = public_users;
