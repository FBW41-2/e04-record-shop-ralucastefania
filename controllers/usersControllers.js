const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.getUsers = (req, res, next) => {
    const users = db.get('users').value()
    res.status(200).send(users);
}

exports.getUserByID = (req, res, next) => {
      const user = db.get("users").find({ id: req.params.id });
    res.status(200).send(user)
}

exports.addUser = (req, res, next) => {
      const user = req.body;
      db.get('users').push({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
      })
      .write()
      res.status(200).send(user);
}
exports.createRecords = function (req, res) {
  db.get("records")
    .push({
      name: req.body.name,
      title: req.body.title,
      year: req.body.year,
    })
    .write();
  res.redirect("/api/records");
};

exports.updateUser = (req, res, next) => {
      db.get('users').find({id}).assign(req.body).write()
      const user = db.get('users').find({id})
      res.status(200).send(user)
}

exports.deleteUserByID = (req, res, next) => {
      db.get('users').remove({id}).write()
      res.status(200).send(user);
}



