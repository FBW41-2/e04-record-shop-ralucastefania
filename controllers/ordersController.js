const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.getOrders = (req, res) => {
    const orders = db.get('orders').value()
    res.status(200).send(orders)
}

exports.getOrderByID = (req, res) => {
    const order = db.get('orders').find({id})
    res.status(200).send(order)
}

exports.addOrder = (req, res) => {
    const order = req.body;
    db.get("orders")
    .push({
        id: Date.now(),
        quantity: req.body.quantity,
    })
    .write();
    res.status(200).send(order)
};

exports.updateOrder = (req, res) => {
    db.get("orders").find({ id }).assign(req.body).write()
    const order = db.get("orders").find({ id })
    res.status(200).send(order);
}

exports.deleteOrderByID = (req, res) => {
  db.get("orders").remove({ id: req.params.id }).write();
  res.status(200).send();
};