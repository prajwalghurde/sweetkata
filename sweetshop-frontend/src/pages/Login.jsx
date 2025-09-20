import { useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

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

  return (
    <div className="container py-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="card card-body">
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
        <button className="btn btn-primary w-100">Login</button>
      </form>
      <p className="mt-3">
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
