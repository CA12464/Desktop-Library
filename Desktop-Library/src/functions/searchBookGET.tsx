interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  cover_image?: string; // Ensure this matches the response from your API
}

export const searchBooks = async (query: string): Promise<Book[]> => {
  try {
    const response = await fetch(`http://localhost:5000/api/searchBooks?query=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    const data: Book[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};



  