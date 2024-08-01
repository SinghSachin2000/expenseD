const express = require("express");
const router = express.Router();

const {createsCard,deleteCard} = require("../controllers/Card");
const { authenticateToken } = require("../middlewares/auth");

router.post("/createCard/:groupId",authenticateToken,createsCard);
router.delete("/deleteCard/:cardId",authenticateToken,deleteCard);

module.exports = router;