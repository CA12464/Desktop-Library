// src/functions/getBookid.ts

interface BookDetailsResponse {
    id: number;
    title: string;
    author: string;
    genre: string;
    publication_date: string;
    cover_image_url?: string; // Optional in case it's not available
    description?: string;
  }
  
  export const getBookid = async (id: number): Promise<BookDetailsResponse> => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error fetching book details: ${errorData.error || 'Unknown error'}`);
      }
  
      const data: BookDetailsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching book:', error);
      throw error; // Re-throw to handle it in the calling code
    }
  };
  