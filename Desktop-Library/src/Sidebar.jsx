// src/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Optional: if you have CSS for styling

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Library</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/browse">Browse Books</Link>
        </li>
        <li>
          <Link to="/add">Add New Book</Link>
        </li>
        <li>
          <Link to="/search">Search Books</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;


