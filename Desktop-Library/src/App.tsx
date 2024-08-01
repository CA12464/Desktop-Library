// src/App.tsx
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import BrowseBooks from './pages/BrowseBooks';
import AddBook from './pages/AddBook';
import SearchBooks from './pages/SearchBooks';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" Component={Home } />
            <Route path="/browse" Component={BrowseBooks} />
            <Route path="/add" Component={AddBook} />
            <Route path="/search" Component={SearchBooks} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
