import React, { useState } from 'react';
import { addBook } from '../functions/addBookPost'; // Import the updated function
import './AddBook.css'; // Import CSS for this component

const AddBook: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [publicationDate, setPublicationDate] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // Type the event as React.FormEvent<HTMLFormElement>
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Create the bookData object here
      const bookData = {
        title,
        author,
        genre,
        publication_date: publicationDate, // Ensure this key matches the server's expected key
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

  // Type the events in onChange handlers
  return (
    <div className="add-book-container">
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit} className="add-book-form">
        <label className="form-label">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Author:
          <input
            type="text"
            value={author}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Genre:
          <input
            type="text"
            value={genre}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGenre(e.target.value)}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Publication Year:
          <input
            type="number"
            value={publicationDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPublicationDate(e.target.value)}
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



