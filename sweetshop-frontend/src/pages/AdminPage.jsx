import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminPanel from "../components/Admin/AdminPanel";
import SweetList from "../components/Sweets/SweetList";

export default function AdminPage() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>Admin Dashboard</h2>
        <button className="btn btn-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </div>
      <AdminPanel refresh={() => window.location.reload()} />
      <SweetList />
    </div>
  );
}
