import { useEffect, useState } from 'react';
import { searchBooks } from '../functions/searchBookGET'; // Adjust the import path as needed

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
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
      {error && <p>{error}</p>}
      <ul>
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book.id}>
              <div></div>
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>Publication Date: {book.publication_date}</p>
            </li>
          ))
        ) : (
          <p>No books available</p>
        )}
      </ul>
    </div>
  );
}

export default BrowseBooks;





