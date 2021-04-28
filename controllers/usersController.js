const mongodb = require("mongodb");

exports.getUsers = (req, res, next) => {
    req.app.locals.db
      .collection("users")
      .find()
      .toArray((err, docs) => {
        res.json(docs);
      });
}

exports.getUser = (req, res, next) => {
    const { id } = req.params;
    req.app.locals.db
      .collection("users")
      .find({ id: new mongodb.ObjectID(id) }, (err, result) => {
        res.json(result);
      });
}

exports.deleteUser = (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db
    .collection("users")
    .deleteOne({ _id: new mongodb.ObjectID(id) }, (err, result) => {
      if (err) console.error(err);
      res.json([{ deleted: result.deletedCount }]);
    });
};

exports.updateUser = (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db.collection("users").updateOne(
    { _id: new mongodb.ObjectID(id) },
    {
      $set: req.body,
    },
    (err, entry) => {
      res.json(entry);
    }
  );
};

exports.addUser = (req, res, next) => {
  req.app.locals.db.collection("users").insertOne(req.body, (err, entry) => {
    res.json(entry);
  });
};