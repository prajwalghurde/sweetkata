import { Link } from "react-router-dom";
import bgImage from "../assets/bg.png";

export default function NotFound() {
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
    position: "relative",
  };

  const overlayStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  };

  return (
    <div style={backgroundStyles}>
      <div style={overlayStyles}></div>
      <div className="container text-center py-5" style={{ position: "relative", zIndex: 1 }}>
        <h1 className="display-3 text-white">404</h1>
        <p className="lead text-white">Oops! The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary mt-3">
          Go Home
        </Link>
      </div>
    </div>
  );
}