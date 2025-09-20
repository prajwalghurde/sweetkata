import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SweetList from "../components/Sweets/SweetList";
import SearchBar from "../components/Sweets/SearchBar";

export default function Home() {
  const { logout, user } = useContext(AuthContext);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🍬 Sweet Shop</h2>
        <div>
          {user?.isAdmin && (
            <a href="/admin" className="btn btn-warning btn-sm me-2">
              Admin Panel
            </a>
          )}
          <button className="btn btn-danger btn-sm" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      
      <SweetList />
    </div>
  );
}
