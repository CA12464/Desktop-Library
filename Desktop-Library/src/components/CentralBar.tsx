import { Link } from 'react-router-dom';
import { BookmarkPlus, Compass, LibraryBig } from 'lucide-react';
import './CentralBar.css'; // Import the CSS file

function CentralBar() {
  return (
    <div className="central-bar-container">
      <Link to="/browse" className="button--primary browse">
        <LibraryBig className="button-icon" />
        <div className="tooltip">Browse</div>
      </Link>
      <Link to="/add" className="button--primary add">
        <BookmarkPlus className="button-icon" />
        <div className="tooltip">Add</div>
      </Link>
      <Link to="/search" className="button--primary search">
        <Compass className="button-icon" />
        <div className="tooltip">Search</div>
      </Link>
    </div>
  );
}

export default CentralBar;
