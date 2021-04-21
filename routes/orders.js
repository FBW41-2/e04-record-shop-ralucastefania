const express = require("express");
const router = express.Router();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);
const { getOrders, getOrderByID, addOrder, updateOrder, deleteOrderByID } = require("../controllers/ordersController");

router.get("/", getOrders);

router.get("/:id", getOrderByID);

router.put("/", addOrder);

router.post("/:id", updateOrder);

router.delete("/:id", deleteOrderByID);
