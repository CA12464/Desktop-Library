export const searchBooks = async (query) => {
    try {
      const response = await fetch(`http://localhost:5000/api/search?query=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching search results:', error);
      throw error; // Rethrow the error to be caught in the component
    }
  };
  