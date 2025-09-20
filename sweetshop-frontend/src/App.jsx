import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx"; // ✅ fixed extension
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

function App() {
  const { token, user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {!token ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            {user?.isAdmin && <Route path="/admin" element={<AdminPage />} />}
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
