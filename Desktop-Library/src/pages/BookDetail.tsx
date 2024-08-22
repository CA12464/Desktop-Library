// src/pages/BookDetails.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import { getBookid } from '../functions/getBookid'; // Function to fetch a single book by ID
import styles from './BookDetails.module.css';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  cover_image_url?: string;
  description?: string;
}

function BookDetail() {
  const { id } = useParams<{ id: string }>(); // Get the book ID from the URL params
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookid(Number(id));
        setBook(data);
      } catch (error) {
        console.error("Error fetching book: ", error);
        setError('Failed to fetch book details');
      }
    };

    fetchBook();
  }, [id]);

  if (error) return <p className={styles.errorMessage}>{error}</p>;
  if (!book) return <p>Loading...</p>;

  return (
    <div className={styles.bookDetailsWrapper}>
      <h1>{book.title}</h1>
      {book.cover_image_url && <img src={book.cover_image_url} alt={`${book.title} Cover`} />}
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Publication Date:</strong> {book.publication_date}</p>
      <p><strong>Description:</strong> {book.description}</p>
    </div>
  );
}

export default BookDetail;
