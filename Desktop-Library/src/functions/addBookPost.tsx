// src/functions/addBookPost.ts

export const addBook = async (formData: FormData): Promise<void> => {
  try {
    const response = await fetch('http://localhost:5000/api/addBook', {
      method: 'POST',
      body: formData, // Use FormData directly
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

