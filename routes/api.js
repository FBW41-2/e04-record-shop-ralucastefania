const express = require("express");
const router = express.Router();
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./data/db.json");
const db = lowdb(adapter);

router.get("/records", (req, res) => {
  res.send(db.get("records").value());
});

router.post("/records", (req, res) => {
  const newRecord = {
    id: Date.now(),
    title: "#happy",
    img: "benoclu.jpg",
    artist: "Trilulilu",
    year: 2000,
  };
  db.get("records").push(newRecord).write();
  res.send(db.get("records").find({ id: newRecord.id }));
});

module.exports = router;
