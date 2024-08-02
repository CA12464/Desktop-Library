// src/functions/addBookPost.ts

interface Book {
  title: string;
  author: string;
  genre: string;
  publication_date: string;
}

export const addBook = async (newBook: Book): Promise<void> => {
  try {
    const response = await fetch('http://localhost:5000/api/addBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Get error text from response
      throw new Error(`Network response was not ok. Status: ${response.status}, Error: ${errorText}`);
    }
  } catch (error) {
    console.error('Error adding book:', error);
    throw error; // Propagate error to be handled in the component
  }
};