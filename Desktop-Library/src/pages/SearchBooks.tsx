import { useState } from 'react';
import { searchBooks } from '../functions/searchBookGET'; // Import the searchBooks function
import './SearchBooks.css'; // Import CSS for styling

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publication_date: string; // Assuming this is a string date
}

function SearchBooks() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Book[]>([]);
  const [error, setError] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false); // Track if a search has been performed

  const handleSearch = async () => {
    setHasSearched(true); // Set to true when search is initiated
    try {
      const data: Book[] = await searchBooks(query);
      setResults(data);
      setError('');
    } catch (error: any) {
      console.error('Error fetching search results:', error.message || error);
      setError('Failed to fetch search results');
      setResults([]);
    }
  };


  return (
    <div className="search-books-container">
      {/* <h1 className="search-header">Search Books</h1> */}
      <div className="search-form-container">
        <div className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, etc."
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      {hasSearched && !error && results.length === 0 && (
        <p className="no-results">No books found</p>
      )}
      {results.length > 0 && (
        <div className="results-container">
          {results.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-details">
                <h2 className="book-title">{book.title}</h2>
                <p className="book-author">Author: {book.author}</p>
                <p className="book-genre">Genre: {book.genre}</p>
                <p className="book-date">Publication Date: {new Date(book.publication_date).getFullYear()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBooks;
