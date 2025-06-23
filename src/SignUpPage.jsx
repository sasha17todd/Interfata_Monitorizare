import { useState } from "react";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

import "./AuthPage.css";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;
      await set(ref(db, "users/" + user.uid), {
        email: user.email,
        createdAt: Date.now()
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
  document.body.classList.add("auth-body");
  return () => document.body.classList.remove("auth-body");
  }, []);


  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Parola" value={pass} onChange={e => setPass(e.target.value)} required />
          <button type="submit">Înregistrează-te</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p>Ai deja cont? <Link to="/login">Conectează-te</Link></p>
      </div>
    </div>
  );
}
