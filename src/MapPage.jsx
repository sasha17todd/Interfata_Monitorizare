import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { FaSignOutAlt } from "react-icons/fa"; // icon logout


export default function MapPage() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="map-page">
      <header className="topbar">
        <div className="title-group">
          <img src="/icon-192.png" alt="logo" />
          <h1>Harta Tomberoane</h1>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </header>


      <div className="map-bins">
        <Link to="/stats/container" className="map-bin bin1">
          <img src="/icon-192.png" alt="Tomberon Real" />
          <p>Tomberon Parter</p>
        </Link>
        <Link to="/stats/site1" className="map-bin bin2">
          <img src="/icon-192.png" alt="Tomberon Site 1" />
          <p>Tomberon Etaj</p>
        </Link>
        <Link to="/stats/site2" className="map-bin bin3">
          <img src="/icon-192.png" alt="Tomberon Site 2" />
          <p>Tomberon Bloc C</p>
        </Link>

        <svg className="map-lines">
          <line x1="50%" y1="0%" x2="20%" y2="80%" />
          <line x1="50%" y1="0%" x2="80%" y2="80%" />
          <line x1="20%" y1="80%" x2="80%" y2="80%" />
        </svg>
      </div>
    </div>
  );
}
