import { useEffect, useState } from 'react';

function BrowseBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books: ", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="browse-books-container">
      <h1>Browse Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book[0]}>
            <h2>{book[1]}</h2>
            <p>Author: {book[2]}</p>
            <p>Genre: {book[3]}</p>
            <p>Publication Date: {book[4]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BrowseBooks;



