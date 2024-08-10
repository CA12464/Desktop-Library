
interface BookImageResponse {
    cover_image_url?: string; // Optional, as it may not be present if the image is not found
    error?: string; // Optional, in case of an error
  }

export const BookImage = async (bookId: number): Promise<BookImageResponse> => {
    try {
      const response = await fetch(`http://localhost:5000/api/BookImage/${bookId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error fetching book image: ${errorData.error || 'Unknown error'}`);
      }
  
      const data: BookImageResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching book image:', error);
      throw error;
    }
  };