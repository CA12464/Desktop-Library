import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file
import { GiMushroomHouse } from "react-icons/gi";
import { FaBook, FaPlus, FaSearch } from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>Library</h2>
      <ul>
        <li>
          <Link to="/">
            <GiMushroomHouse className="sidebar-icon mushroom-icon" /> {/* Apply both classes */}
          </Link>
        </li>
        <li>
          <Link to="/browse">
            <FaBook className="sidebar-icon" />
          </Link>
        </li>
        <li>
          <Link to="/add">
            <FaPlus className="sidebar-icon" />
          </Link>
        </li>
        <li>
          <Link to="/search">
            <FaSearch className="sidebar-icon" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;



