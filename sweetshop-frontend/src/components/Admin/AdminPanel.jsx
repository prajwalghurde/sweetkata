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
    <div className="mt-4 card card-body">
      <h3>Add Sweet</h3>
      <form onSubmit={handleAdd}>
        <input name="name" className="form-control mb-2" placeholder="Name" />
        <input name="category" className="form-control mb-2" placeholder="Category" />
        <input name="price" type="number" className="form-control mb-2" placeholder="Price" />
        <input name="quantity" type="number" className="form-control mb-2" placeholder="Quantity" />
        <button className="btn btn-success w-100">Add Sweet</button>
      </form>
    </div>
  );
}
