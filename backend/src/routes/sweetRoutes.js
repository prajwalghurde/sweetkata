const express = require("express");
const {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
} = require("../controllers/sweetsController");
const { authenticate, authorizeAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/", authenticate, authorizeAdmin, addSweet);
router.get("/", authenticate, getSweets);
router.get("/search", authenticate, searchSweets);
router.put("/:id", authenticate, authorizeAdmin, updateSweet);
router.delete("/:id", authenticate, authorizeAdmin, deleteSweet);

module.exports = router;
