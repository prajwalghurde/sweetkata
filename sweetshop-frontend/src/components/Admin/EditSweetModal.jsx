import { useState } from "react";
import API from "../../api/api";

export default function EditSweetModal({ sweet, onClose, refresh }) {
  const [form, setForm] = useState({
    name: sweet.name,
    category: sweet.category,
    price: sweet.price,
    quantity: sweet.quantity,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put(`/sweets/${sweet._id}`, form);
    refresh();
    onClose();
  };

  const handleRestock = async () => {
    const qty = prompt("Enter restock quantity:");
    if (!qty) return;
    await API.post(`/sweets/${sweet._id}/restock`, { quantity: Number(qty) });
    refresh();
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Sweet</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <input name="name" className="form-control mb-2" value={form.name} onChange={handleChange} />
              <input name="category" className="form-control mb-2" value={form.category} onChange={handleChange} />
              <input name="price" type="number" className="form-control mb-2" value={form.price} onChange={handleChange} />
              <input name="quantity" type="number" className="form-control mb-2" value={form.quantity} onChange={handleChange} />
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-warning" onClick={handleRestock}>Restock</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
