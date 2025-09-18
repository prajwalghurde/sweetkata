const Sweet = require("../models/Sweet");

// Add a new sweet (admin only)
const addSweet = async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.status(201).json({ data: sweet });
  } catch (err) {
    res.status(500).json({ error: "Failed to add sweet" });
  }
};

// Get all sweets
const getSweets = async (_req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json({ data: sweets });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sweets" });
  }
};

// Search sweets by name/category/price
const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const query = {};
    if (name) query.name = { $regex: name, $options: "i" };
    if (category) query.category = { $regex: category, $options: "i" };
    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);

    const sweets = await Sweet.find(query);
    res.status(200).json({ data: sweets });
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
};

// Update sweet (admin only)
const updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });
    res.status(200).json({ data: sweet });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

// Delete sweet (admin only)
const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });
    res.status(200).json({ message: "Sweet deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};

module.exports = { addSweet, getSweets, searchSweets, updateSweet, deleteSweet };
