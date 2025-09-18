const Sweet = require("../models/Sweet");

// Purchase sweet (user)
const purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: "Invalid quantity" });
    }

    const updated = await Sweet.findOneAndUpdate(
      { _id: id, quantity: { $gte: quantity } }, // only if enough stock
      { $inc: { quantity: -quantity } },         // decrease stock
      { new: true }
    );

    if (!updated) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    res.status(200).json({ data: updated });
  } catch (err) {
    res.status(500).json({ error: "Purchase failed" });
  }
};

// Restock sweet (admin only)
const restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: "Invalid quantity" });
    }

    const updated = await Sweet.findByIdAndUpdate(
      id,
      { $inc: { quantity } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    res.status(200).json({ data: updated });
  } catch (err) {
    res.status(500).json({ error: "Restock failed" });
  }
};

module.exports = { purchaseSweet, restockSweet };
