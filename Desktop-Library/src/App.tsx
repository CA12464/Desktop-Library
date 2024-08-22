// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import BrowseBooks from './pages/BrowseBooks';
import AddBook from './pages/AddBook';
import SearchBooks from './pages/SearchBooks';
import BookDetail from './pages/BookDetail'; // Import the BookDetails page
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<BrowseBooks />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/search" element={<SearchBooks />} />
            <Route path="/books/:id" element={<BookDetail />} /> {/* Add this route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
