const mongoose = require('mongoose');

// Define the schema for the book
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number,
        required: false
    },
    genre: {
        type: String,
        required: false
    },
    copiesSold: {
        type: Number,
        required: false
    }
});

// Create the model
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
