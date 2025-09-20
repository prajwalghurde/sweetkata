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
    <div className="container py-4">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="card card-body mb-3">
        <input
          className="form-control mb-2"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Admin toggle */}
        <div className="form-check mb-2">
          <input
            type="checkbox"
            id="isAdmin"
            className="form-check-input"
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
