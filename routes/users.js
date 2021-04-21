const express = require("express");
const router = express.Router();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);
const {
  getUsers,
  getUserByID,
  addUser,
  updateUser,
  deleteUserByID,
} = require("../controllers/usersController");

/* GET users listing. */
router.get("/", getUsers);

router.get("/:id", getUserByID);

router.post("/", addUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUserByID);

module.exports = router;
