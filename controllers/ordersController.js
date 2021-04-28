const mongodb = require("mongodb");

exports.getOrders = (req, res, next) => {
  req.app.locals.db
    .collection("orders")
    .find()
    .toArray((err, docs) => {
      res.json(docs);
    });
};

exports.getOrder = (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db
    .collection("orders")
    .find({ id: new mongodb.ObjectID(id) }, (err, result) => {
      res.json(result);
    });
};

exports.deleteOrder = (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db
    .collection("orders")
    .deleteOne({ _id: new mongodb.ObjectID(id) }, (err, result) => {
      if (err) console.error(err);
      res.json([{ deleted: result.deletedCount }]);
    });
};


exports.updateOrder = (req, res, next) => {
  req.app.locals.db.collection("orders").updateOne(
    { _id: new mongodb.ObjectID(id) },
    {
      $set: req.body,
    },
    (err, entry) => {
      res.json(entry);
    }
  );
};

exports.addOrder = (req, res, next) => {
  req.app.locals.db.collection("orders").insertOne(req.body, (err, entry) => {
    res.json(entry);
  });
};
