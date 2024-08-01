// src/pages/AddBook.jsx

import { useState } from 'react';
import { addBook } from '../functions/addBookPost'; // Import the updated function
import './AddBook.css'; // Import CSS for this component

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookData = {
        title,
        author,
        genre,
        publication_date: publicationDate,
      };
      // Replace with your addBook function call
      const result = await addBook(bookData);
      setMessage(`Book added successfully: ${result.title}`);
      setTitle('');
      setAuthor('');
      setGenre('');
      setPublicationDate('');
    } catch (error) {
      console.error('Error adding book:', error); // Log the error for debugging
      setMessage('Error adding book');
    }
  };

  return (
    <div className="add-book-container">
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit} className="add-book-form">
        <label className="form-label">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Genre:
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Publication Year:
          <input
            type="number"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            min="1900" // Set minimum year
            max={new Date().getFullYear()} // Set maximum year to current year
            className="form-input"
          />
        </label>
        <button type="submit" className="form-button">Add Book</button>
      </form>
      {message && <p className="message">{message}</p>} {/* Display success or error message */}
    </div>
  );
}

export default AddBook;

