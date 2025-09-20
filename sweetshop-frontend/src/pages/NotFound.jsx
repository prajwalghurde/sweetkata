import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-3">404</h1>
      <p className="lead">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Go Home
      </Link>
    </div>
  );
}
