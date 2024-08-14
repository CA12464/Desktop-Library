
import styles from '../Background_Stylings/Neon_Sign.module.css'; // Import the CSS Module
import CentralBar from '../components/CentralBar'; // Import the CentralBar component
import BottomBar from '../components/BottomBar';

function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.hero}>
        <div className={styles.heroWrapper}>
          <div className={styles.heroBlock}>
            <h1 className={styles.heroTitle}>
              <span>Ms. Lady's</span>
              <span>Mystic Volumes</span>
            </h1>
          </div>
        </div>
      </div>
      <CentralBar /> {/* Add CentralBar here */}
      <BottomBar />
    </div>
  );
}

export default Home;


