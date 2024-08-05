import { useEffect, useState } from 'react';
import { searchBooks } from '../functions/searchBookGET'; // Adjust the import path as needed
import './BrowseBooks.css'; // Import the CSS file for styling

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  cover_image?: string; // Added cover_image property
}

function BrowseBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await searchBooks(''); // Pass an empty query to get all books
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books: ", error);
        setError('Failed to fetch books');
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="browse-books-container">
      <h1>Browse Books</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="book-grid">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="book-item">
              <img
                src={`/api/getBookImage/${book.id}`} // Ensure the URL is correctly formatted
                alt={`${book.title} Cover`}
                className="book-cover"
              />
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">Author: {book.author}</p>
              <p className="book-genre">Genre: {book.genre}</p>
              <p className="book-date">Publication Date: {book.publication_date}</p>
              <button className="view-more-button">View More</button>
            </div>
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
}

export default BrowseBooks;



