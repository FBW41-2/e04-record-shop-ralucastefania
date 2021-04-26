// const low = require("lowdb");
// const FileSync = require("lowdb/adapters/FileSync");
// const adapter = new FileSync("data/db.json");
// const db = low(adapter);
const mongodb = require("mongodb");

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
  req.app.locals.db
    .collection("records")
    .find({ id: new mongodb.ObjectID(id) }, (err, result) => {
      res.json(result);
    });
};

exports.deleteRecord = (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db
    .collection("records")
    .deleteOne({ _id: new mongodb.ObjectID(id) }, (err, result) => {
      if (err) console.error(err);
      res.json([{ deleted: result.deletedCount }]);
    });
};

exports.updateRecord = (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db.collection("records").updateOne(
    { _id: new mongodb.ObjectID(id) },
    {
      $set: req.body,
    },
    (err, entry) => {
      res.json(entry);
    }
  );
};

exports.addRecord = (req, res, next) => {
  req.app.locals.db
    .collection("records").insertOne(req.body, (err, entry) => {
    res.json(entry);
  });
};
