import { Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";

import { auth } from "./firebase";
import MapPage from "./MapPage";
import StatsPage from "./StatsPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

function RequireAuth({ children }) {
  const [user, loading] = useAuthState(auth);
  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} /> {/* ✅ ruta nouă */}
      <Route path="/" element={
        <RequireAuth>
          <MapPage />
        </RequireAuth>
      } />
      <Route path="/stats/:id" element={
        <RequireAuth>
          <StatsPage />
        </RequireAuth>
      } />
    </Routes>
  );
}