import { useState } from "react";
import EditSweetModal from "../Admin/EditSweetModal";

export default function SweetCard({ sweet, onBuy, onDelete, isAdmin, refresh }) {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <h5>{sweet.name}</h5>
          <p>Category: {sweet.category}</p>
          <p>Price: ${sweet.price}</p>
          <p>Stock: {sweet.quantity}</p>
          <button onClick={() => onBuy(sweet._id)} className="btn btn-primary btn-sm">
            Buy
          </button>
          {isAdmin && (
            <>
              <button onClick={() => setEditing(true)} className="btn btn-warning btn-sm ms-2">
                Edit
              </button>
              <button onClick={() => onDelete(sweet._id)} className="btn btn-danger btn-sm ms-2">
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      {editing && (
        <EditSweetModal sweet={sweet} onClose={() => setEditing(false)} refresh={refresh} />
      )}
    </>
  );
}
