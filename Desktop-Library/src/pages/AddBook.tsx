import React, { useState } from 'react';
import { addBook } from '../functions/addBookPost'; // Import the updated function
import './AddBook.css'; // Import CSS for this component

const AddBook: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [publicationDate, setPublicationDate] = useState<string>('');
  const [coverImage, setCoverImage] = useState<File | null>(null); // State for file input
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate publicationDate to be a number and a valid year
    if (!/^\d{4}$/.test(publicationDate)) {
      setMessage('Invalid publication year');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
    formData.append('publication_date', publicationDate);
    if (coverImage) {
      formData.append('cover_image', coverImage);
    }

    try {
      await addBook(formData);
      setMessage('Book added successfully');
      setTitle('');
      setAuthor('');
      setGenre('');
      setPublicationDate('');
      setCoverImage(null); // Clear file input after submission
    } catch (error) {
      console.error('Error adding book:', error);
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
            min="1000" // Set minimum year
            max={new Date().getFullYear()} // Set maximum year to current year
            className="form-input"
          />
        </label>
        <label className="form-label">
          Cover Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCoverImage(e.target.files ? e.target.files[0] : null)}
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





