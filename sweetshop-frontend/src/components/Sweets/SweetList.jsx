import { useEffect, useState, useContext } from "react";
import API from "../../api/api";
import SweetCard from "./SweetCard";
import { AuthContext } from "../../context/AuthContext";
import SearchBar from "./SearchBar";

export default function SweetList() {
  const { token, user } = useContext(AuthContext);
  const [sweets, setSweets] = useState([]);

  const loadSweets = async () => {
    const res = await API.get("/sweets");
    setSweets(res.data.data || []);
  };

  useEffect(() => {
    if (token) loadSweets();
  }, [token]);

  const buy = async (id) => {
    const qty = prompt("Enter quantity:");
    if (!qty) return;
    await API.post(`/sweets/${id}/purchase`, { quantity: Number(qty) });
    loadSweets();
  };

  const del = async (id) => {
    await API.delete(`/sweets/${id}`);
    loadSweets();
  };

  return (
    <>
      <SearchBar onResults={setSweets} />
      <div className="row mt-2">
        {sweets.map((s) => (
          <div className="col-md-4" key={s._id}>
            <SweetCard
              sweet={s}
              onBuy={buy}
              onDelete={del}
              isAdmin={user?.isAdmin}
              refresh={loadSweets}
            />
          </div>
        ))}
      </div>
    </>
  );
}
