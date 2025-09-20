import API from "../../api/api";

export default function AdminPanel({ refresh }) {
  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const body = {
      name: form.name.value,
      category: form.category.value,
      price: Number(form.price.value),
      quantity: Number(form.quantity.value),
    };
    await API.post("/sweets", body);
    form.reset();
    refresh();
  };

  return (
    <div className="p-2">
      <h5 className="mb-3 text-secondary">Add Sweet</h5>
      <form onSubmit={handleAdd}>
        <div className="mb-2">
          <input name="name" className="form-control" placeholder="Name" required />
        </div>
        <div className="mb-2">
          <input name="category" className="form-control" placeholder="Category" required />
        </div>
        <div className="mb-2">
          <input name="price" type="number" className="form-control" placeholder="Price" required />
        </div>
        <div className="mb-3">
          <input name="quantity" type="number" className="form-control" placeholder="Quantity" required />
        </div>
        <button className="btn btn-success w-100">Add Sweet</button>
      </form>
    </div>
  );
}