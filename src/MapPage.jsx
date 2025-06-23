import { Link } from "react-router-dom";
import "./MapPage.css";

export default function MapPage() {
  return (
    <div className="map-page">
      <h1>Alege un tomberon</h1>
      <div className="bins">
        <Link to="/stats/container">
          <img src="/icon-192.png" alt="Tomberon Real" />
          <p>Tomberon Real</p>
        </Link>
        <Link to="/stats/site1">
          <img src="/icon-192.png" alt="Site 1" />
          <p>Tomberon Site 1</p>
        </Link>
        <Link to="/stats/site2">
          <img src="/icon-192.png" alt="Site 2" />
          <p>Tomberon Site 2</p>
        </Link>
      </div>
    </div>
  );
}
