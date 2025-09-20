import { useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.png";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      if (res.data.token) {
        login(res.data);
        navigate("/");
      }
    } catch {
      alert("Login failed. Check your credentials.");
    }
  };

  const backgroundStyles = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  };

  const cardStyles = {
    maxWidth: "400px",
    minWidth: "300px",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Transparent white background
  };

  return (
    <div style={backgroundStyles}>
      <div>
        <h2 style={{ fontFamily: 'Pacifico, cursive', color: '#ffffff', marginBottom: '1rem', textAlign: 'center' }}>
          Your Sweet Adventure Continues!
        </h2>
        <h2 style={{ color: '#ffffff', textAlign: 'center' }}>Login Now</h2>
        <form onSubmit={handleSubmit} className="card card-body p-4 mx-auto" style={cardStyles}>
          <input
            type="email"
            className="form-control mb-3 text-center"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            className="form-control mb-2 text-center"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="btn btn-success w-100">Login</button>
        </form>
        <p style={{ textAlign: 'center', color: 'white' }}>
          Don’t have an account? <Link to="/register" style={{ color: '#a7f3d0' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}