// src/pages/BrowseBooks.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchBooks } from '../functions/searchBookGET';
import { BookImage } from '../functions/BookImageGET';
import styles from './BrowseBooks.module.css';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  cover_image_url?: string;
}

function BrowseBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const fetchBooks = async (): Promise<Book[]> => {
      try {
        const data = await searchBooks('');
        return data;
      } catch (error) {
        console.error("Error fetching books: ", error);
        setError('Failed to fetch books');
        return [];
      }
    };

    const fetchBookImages = async (books: Book[]) => {
      try {
        const updatedBooks = await Promise.all(
          books.map(async (book) => {
            const { cover_image_url } = await BookImage(book.id);
            return { ...book, cover_image_url };
          })
        );
        setBooks(updatedBooks);
      } catch (error) {
        console.error("Error fetching book images: ", error);
        setError('Failed to fetch book images');
      }
    };

    fetchBooks().then((fetchedBooks) => fetchBookImages(fetchedBooks));
  }, []);

  const handleViewMore = (id: number) => {
    navigate(`/books/${id}`); // Navigate to the book details page with the book ID
  };

  return (
    <div className={styles.browseBooksWrapper}>
      <h1 className={styles.browseBooksHeader}></h1>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div className={styles.cardContainer}>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className={styles.card}>
              {book.cover_image_url ? (
                <img
                  src={book.cover_image_url}
                  alt={`${book.title} Cover`}
                  className={styles.card__background}
                />
              ) : (
                <img
                  src="/images/placeholder.png"
                  alt="Placeholder"
                  className={styles.card__background}
                />
              )}
              <div className={styles.card__content}>
                <h2 className={styles.card__title}>{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
                <p>Publication Date: {book.publication_date}</p>
                <button
                  className={styles.card__button}
                  onClick={() => handleViewMore(book.id)} // Handle button click
                >
                  View More
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
}

export default BrowseBooks;
