import { useState } from "react";
import API from "../../api/api";

export default function SearchBar({ onResults }) {
  const [query, setQuery] = useState({ name: "", category: "", minPrice: "", maxPrice: "" });

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.get("/sweets/search", { params: query });
    onResults(res.data.data || []);
  };

  return (
    <form onSubmit={handleSubmit} className="row g-2 mb-4">
      <div className="col-md-3">
        <input name="name" className="form-control" placeholder="Name" onChange={handleChange} />
      </div>
      <div className="col-md-3">
        <input name="category" className="form-control" placeholder="Category" onChange={handleChange} />
      </div>
      <div className="col-md-2">
        <input name="minPrice" type="number" className="form-control" placeholder="Min Price" onChange={handleChange} />
      </div>
      <div className="col-md-2">
        <input name="maxPrice" type="number" className="form-control" placeholder="Max Price" onChange={handleChange} />
      </div>
      <div className="col-md-2">
        <button className="btn btn-outline-primary w-100">Search</button>
      </div>
    </form>
  );
}