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
// GET /api/sweets/search?name=Ladoo&category=Indian&minPrice=10&maxPrice=100
const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const filter = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    res.status(200).json({ data: sweets });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

// Purchase sweet (any user)
const purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) return res.status(400).json({ message: "Invalid quantity" });

    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });
    if (sweet.quantity < quantity) return res.status(400).json({ message: "Not enough stock" });

    sweet.quantity -= quantity;
    await sweet.save();

    res.status(200).json({ message: "Purchase successful", data: sweet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Restock sweet (Admin only)
const restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) return res.status(400).json({ message: "Invalid quantity" });

    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    sweet.quantity += quantity;
    await sweet.save();

    res.status(200).json({ message: "Restocked successfully", data: sweet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addSweet, getSweets, searchSweets, updateSweet, deleteSweet, purchaseSweet, restockSweet };

