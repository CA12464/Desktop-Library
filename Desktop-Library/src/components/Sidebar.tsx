import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file
import { Waypoints, ArrowLeft } from 'lucide-react'; // Import icons

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/" className="sidebar-icon">
            <Waypoints /> {/* Home button */}
          </Link>
        </li>
        <li>
          <button onClick={() => navigate(-1)} className="sidebar-icon">
            <ArrowLeft /> {/* Back button */}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
