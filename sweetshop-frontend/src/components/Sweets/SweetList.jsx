import { useEffect, useState, useContext } from "react";
import API from "../../api/api";
import SweetCard from "./SweetCard";
import { AuthContext } from "../../context/AuthContext";
import SearchBar from "./SearchBar";

export default function SweetList() {
  const { token, user } = useContext(AuthContext);
  const [sweets, setSweets] = useState([]);

  const loadSweets = async () => {
    try {
      const res = await API.get("/sweets");
      setSweets(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch sweets:", error);
      // You can add a user-friendly message here, e.g., setSweets([]);
    }
  };

  useEffect(() => {
    if (token) loadSweets();
  }, [token]);

  const buy = async (id) => {
    const qty = prompt("Enter quantity:");
    if (!qty) return;
    try {
      await API.post(`/sweets/${id}/purchase`, { quantity: Number(qty) });
      loadSweets();
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Purchase failed. Please try again.");
    }
  };

  const del = async (id) => {
    try {
      await API.delete(`/sweets/${id}`);
      loadSweets();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed. Please try again.");
    }
  };

  return (
    <>
      <SearchBar onResults={setSweets} />
      <div className="row mt-2">
        {sweets.length > 0 ? (
          sweets.map((s) => (
            <div className="col-md-6 col-lg-4" key={s._id}>
              <SweetCard
                sweet={s}
                onBuy={buy}
                onDelete={del}
                isAdmin={user?.isAdmin}
                refresh={loadSweets}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-muted w-100">No sweets to display.</p>
        )}
      </div>
    </>
  );
}