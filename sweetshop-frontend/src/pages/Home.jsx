import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SweetList from "../components/Sweets/SweetList";
import { Link } from "react-router-dom"; // Import Link
import bgImage from "../assets/bg.png"; // Import your background image

export default function Home() {
  const { logout, user } = useContext(AuthContext);

  const backgroundStyles = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    width: "100vw",
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

  const headerCardStyles = {
    backgroundColor: "#ffffff", // Solid white for better readability
    border: "none",
  };

  return (
    <div style={backgroundStyles}>
      <div style={overlayStyles}></div> {/* This is the dark overlay */}
      <div className="container py-5" style={{ position: "relative", zIndex: 1 }}>
        {/* Top Header Section */}
        <div className="bg-white p-3 rounded-3 shadow-sm mb-4" style={headerCardStyles}>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-dark mb-0">🍬 Sweet Shop</h2>
            <div>
              {user?.isAdmin && (
                <Link to="/admin-panel" className="btn btn-warning btn-sm me-2"> {/* Changed to Link */}
                  Admin Panel
                </Link>
              )}
              <button className="btn btn-danger btn-sm" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
        
        {/* SweetList component already has its own background/overlay if you want it full screen,
            or you can keep it within the container and remove its internal background styles.
            For this setup, SweetList will now render within this container's context. */}
        <SweetList /> 
      </div>
    </div>
  );
}