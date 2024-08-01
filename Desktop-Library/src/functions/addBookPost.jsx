// src/functions/addBookPost.js

export const addBook = async (bookData) => {
  try {
    const response = await fetch('http://localhost:5000/api/addBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};
