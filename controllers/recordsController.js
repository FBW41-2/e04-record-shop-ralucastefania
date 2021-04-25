const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.getRecords = (req, res, next) => {
  req.app.locals.db
    .collection("records")
    .find()
    .toArray((err, docs) => {
      res.json(docs);
    });
};

exports.getRecord = (req, res, next) => {
  const { id } = req.params;
  const record = db.get("records").find({ id });
  res.status(200).send(record);
};

exports.deleteRecord = (req, res, next) => {
  const { id } = req.params;
  const record = db.get("records").remove({ id }).write();
  res.status(200).send(record);
};

exports.updateRecord = (req, res, next) => {
  const { id } = req.params;
  const dt = req.body;
  const record = db.get("records").find({ id }).assign(dt).write();
  res.status(200).send(record);
};

exports.addRecord = (req, res, next) => {
  const newRecord = records.insertOne(
    { artist: "Snoop Dog", album_name: "Dog Pound", year: 1998 },
    (err, entry) => {
      res.json(newRecord);
    }
  );
};
