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
      const data: Book[] = await searchBooks(query); // Call searchBooks function
      setResults(data); // Set search results
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Failed to fetch search results');
      setResults([]); // Clear results on error
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
            {/* {console.log(book.publication_date)} */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBooks;

