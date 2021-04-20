const express = require("express");
const router = express.Router();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);
const {
  getRecords,
  addRecord,
  getRecordByID,
  putRecordByID,
  deleteRecordByID,
  checkIdMiddleware,
} = require("../controllers/recordsController");

/**
 * GET all records
 */
router.get("/", getRecords);

/**
 * POST a record
 */
router.post("/", addRecord);

router.get("/:id", checkIdMiddleware, getRecordByID);

router.put("/:id", checkIdMiddleware, putRecordByID);

router.delete("/:id", checkIdMiddleware, deleteRecordByID);

module.exports = router;
