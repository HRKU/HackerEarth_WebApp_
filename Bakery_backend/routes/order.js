const express = require("express");
const router = express.Router();

const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus
} = require("../controllers/order");

router.post(
  "/order/create",
  createOrder
);

module.exports = router;
