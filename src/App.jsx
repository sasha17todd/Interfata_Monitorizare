import { Routes, Route } from "react-router-dom";
import MapPage from "./MapPage";
import StatsPage from "./StatsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MapPage />} />
      <Route path="/stats/:id" element={<StatsPage />} />
    </Routes>
  );
}
