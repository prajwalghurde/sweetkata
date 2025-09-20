import { useState } from "react";
import EditSweetModal from "../Admin/EditSweetModal";

export default function SweetCard({ sweet, onBuy, onDelete, isAdmin, refresh }) {
  const [editing, setEditing] = useState(false);

  // Add a check to prevent rendering if the sweet data is invalid
  if (!sweet) {
    return null; 
  }

  return (
    <>
      <div className="card mb-3 shadow-sm rounded">
        <div className="card-body d-flex justify-content-between align-items-start p-2">
          <div className="d-flex flex-column">
            <h5 className="mb-1 text-dark">{sweet.name}</h5>
            <small className="text-muted">Category: {sweet.category}</small>
            <small className="text-success fw-bold mt-1">Price: ${sweet.price}</small>
            <small className="text-info">Stock: {sweet.quantity}</small>
          </div>

          <div className="d-flex flex-column gap-2">
            <button onClick={() => onBuy(sweet._id)} className="btn btn-primary btn-sm">
              Buy
            </button>
            {isAdmin && (
              <>
                <button onClick={() => setEditing(true)} className="btn btn-warning btn-sm">
                  Edit
                </button>
                <button onClick={() => onDelete(sweet._id)} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {editing && (
        <EditSweetModal sweet={sweet} onClose={() => setEditing(false)} refresh={refresh} />
      )}
    </>
  );
}