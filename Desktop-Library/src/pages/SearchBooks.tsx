import { useState } from 'react';
import { searchBooks } from '../functions/searchBookGET'; // Import the searchBooks function

// Define a type for the book data
interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publication_date: string; // Assuming this is a string date
}

function SearchBooks() {
  // Type the state hooks
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Book[]>([]); // Typed as an array of Book
  const [error, setError] = useState<string>('');

  const handleSearch = async () => {
    try {
      console.log('Query:', query);
  
      // Call searchBooks function
      const data: Book[] = await searchBooks(query);
      console.log('Data received:', data);
  
      // Update state with results
      setResults(data);
      setError('');
    } catch (error: any) {
      // Log error details
      console.error('Error fetching search results:', error.message || error);
      setError('Failed to fetch search results');
      setResults([]);
    }
  };
  

  return (
    <div>
      <h1>Search Books</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query state
        placeholder="Search by title, author, etc."
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if exists */}
      <ul>
        {results.map((book) => (
          <li key={book.id}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Publication Date: {new Date(book.publication_date).getFullYear()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBooks;

