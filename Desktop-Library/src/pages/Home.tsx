// src/pages/Home.tsx
import '../Background_Stylings/Neon_Sign.css'; // Import the CSS file
import CentralBar from '../components/CentralBar'; // Import the CentralBar component
import BottomBar from '../components/BottomBar';

function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <div className="hero-wrapper">
          <div className="hero-block">
            <h1 className="hero-title">
              <span>Ms. Lady's</span>
              <span>Mystic Volumes</span>
            </h1>
          </div>
        </div>
      </div>
      <CentralBar /> {/* Add CentralBar here */}
      <BottomBar/>
    </div>
  );
}

export default Home;

