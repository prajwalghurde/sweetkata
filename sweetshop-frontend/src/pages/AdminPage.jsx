import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminPanel from "../components/Admin/AdminPanel";
import SweetList from "../components/Sweets/SweetList";
import bgImage from "../assets/bg.png";

export default function AdminPage() {
  const { logout } = useContext(AuthContext);

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
    padding: "20px",
    position: "relative", // Needed for the overlay
  };
  
  const overlayStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay for better contrast
  };

  const cardStyles = {
    backgroundColor: "#ffffff", // Solid white for better readability
    border: "none",
  };

  return (
    <div style={backgroundStyles}>
      <div style={overlayStyles}></div> {/* This is the dark overlay */}
      <div className="container py-5" style={{ position: "relative", zIndex: 1 }}> {/* Content on top of the overlay */}
        {/* Admin Dashboard Header (Hero Section) */}
        <div className="bg-white p-4 rounded-3 shadow-sm mb-4" style={cardStyles}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-4 fw-bold text-dark">Admin Dashboard</h1>
              <p className="lead text-secondary">
                Manage your sweet collection and user roles.
              </p>
            </div>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        <div className="row g-4">
          {/* Sweet Management Panel */}
          <div className="col-lg-6">
            <div className="card h-100 p-4 shadow-sm" style={cardStyles}>
              <div className="card-body">
                <h4 className="card-title text-primary mb-3">Manage Sweets</h4>
                <AdminPanel refresh={() => window.location.reload()} />
              </div>
            </div>
          </div>

          {/* Sweet List Section */}
          <div className="col-lg-6">
            <div className="card h-100 p-4 shadow-sm" style={cardStyles}>
              <div className="card-body">
                <h4 className="card-title text-primary mb-3">Current Sweets</h4>
                <SweetList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}