const { Router } = require("express");
const { purchaseSweet, restockSweet } = require("../controllers/inventoryController");
const { authenticate, authorizeAdmin } = require("../middlewares/auth");

const router = Router();

router.post("/:id/purchase", authenticate, purchaseSweet);
router.post("/:id/restock", authenticate, authorizeAdmin, restockSweet);

module.exports = router;
