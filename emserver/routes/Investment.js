const express = require("express")
const router= express.Router();


const {invest,editInvest} = require("../controllers/Investment");
const { authenticateToken } = require("../middlewares/auth");


router.post("/invest/:groupId",authenticateToken,invest);
router.put("/editInvest/:groupId/:investmentId ",authenticateToken,editInvest);

module.exports = router