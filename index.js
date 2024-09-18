const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');  // Import the Book model
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB (replace <your_mongo_uri> with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/bookstore', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// GET: Retrieve all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();  // Fetch all books from MongoDB
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST: Add a new book
app.post('/books', async (req, res) => {
    const { title, author, publishedYear, genre, copiesSold } = req.body;
    const newBook = new Book({
        title,
        author,
        publishedYear,
        genre,
        copiesSold
    });

    try {
        const savedBook = await newBook.save();  // Save the new book to MongoDB
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(500).json({ message: 'Error saving book' });
    }
});

// PUT: Update a book by ID
app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, publishedYear, genre, copiesSold } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, publishedYear, genre, copiesSold }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ message: 'Error updating book' });
    }
});

// DELETE: Remove a book by ID
app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(deletedBook);
    } catch (err) {
        res.status(500).json({ message: 'Error deleting book' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
