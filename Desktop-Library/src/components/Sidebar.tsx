import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file
import { Waypoints } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">
           <Waypoints/> {/* Apply both classes */}
          </Link>
        </li>
        <li>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;



