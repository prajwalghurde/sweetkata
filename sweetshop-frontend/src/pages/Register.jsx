import { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";

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

  return (
    <div className="container py-5 text-center" >
      
      <h2 style={{ fontFamily: 'Pacifico, cursive', color: '#ff7f50', marginBottom: '1rem' }}>
  Sign Up & Sweeten Your Day!
</h2>

      
      <h2>Register Now</h2>
      <form onSubmit={handleSubmit} className="card card-body py-4 mb-3 mx-auto" style={{ maxWidth: "400px" }}>
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

        {/* Admin toggle */}
        <div className="form-check mb-4 d-flex justify-content-center align-items-center">
          <input
            type="checkbox"
            id="isAdmin"
            className="form-check-input "
            onChange={(e) => setForm({ ...form, isAdmin: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="isAdmin">
             Register as Admin
          </label>
        </div>

        <button className="btn btn-success w-100">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
