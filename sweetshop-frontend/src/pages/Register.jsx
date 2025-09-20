import { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.png";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", isAdmin: false });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch {
      alert("Registration failed. Try again.");
    }
  };

  // Define styles in an object for cleanliness
  const backgroundStyles = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh", // Use 100vh to ensure it covers the viewport height
    width: "100vw",     // Use 100vw to ensure it covers the viewport width
    display: "flex",    // Use flexbox to easily center content
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"     // Add some padding for smaller screens
  };

  const cardStyles = {
    maxWidth: "400px",
    minWidth: "300px",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Transparent white background
  };

  return (
    // This is the main container for the background image
    <div style={backgroundStyles}>
      
      {/* This inner block holds your content */}
      <div>
        <h2 style={{ fontFamily: 'Pacifico, cursive', color: '#ffffff', marginBottom: '1rem', textAlign: 'center' }}>
          Sign Up & Sweeten Your Day!
        </h2>
        <h2 style={{color: '#ffffff', textAlign: 'center'}}>Register Now</h2>

        <form onSubmit={handleSubmit} className="card card-body py-4 mb-3 mx-auto" style={cardStyles}>
          <input
            className="form-control mb-2 text-center"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            className="form-control mb-2 text-center"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            className="form-control mb-4 text-center"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <div className="form-check mb-4 d-flex justify-content-center align-items-center">
            <input
              type="checkbox"
              id="isAdmin"
              className="form-check-input"
              onChange={(e) => setForm({ ...form, isAdmin: e.target.checked })}
            />
            <label className="form-check-label ms-2" htmlFor="isAdmin" style={{color: 'black'}}> {/* Added style for label color */}
              Register as Admin
            </label>
          </div>

          <button className="btn btn-success w-100">Register</button>
        </form>

        <p style={{textAlign: 'center', color: 'white'}}>
          Already have an account? <Link to="/login" style={{color: '#a7f3d0'}}>Login</Link>
        </p>
      </div>

    </div>
  );
}