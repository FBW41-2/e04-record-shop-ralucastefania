const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);


exports.getRecords = (req, res, next) => {
    const records = db.get('records').value()
    res.status(200).send(records);
}


exports.addRecord = (req, res, next) => {
    const record = req.body;
    db.get('records').push(record)
        .last()
        .assign({ id: Date.now().toString() })
        .write()

    res.status(200).send(record);
}

exports.getRecordByID = (req, res) => {
    const record = db.get("records").find({ id: req.params.id });
    res.status(200).send(record)
}

exports.putRecordByID = (req, res) => {
  db.get("records").find({ id: req.params.id }).assign(req.body).write()
  const record = db.get("records").find({ id: req.params.id })
  res.status(200).send(record);
};

exports.deleteRecordByID = (req, res) => {
  db.get("records").remove({ id: req.params.id }).write();
  res.status(200).send();
};

exports.checkIdMiddleware = (req, res, next) => {
    const record = db.get('records').find({id: req.params.id}).value()
    if(record) {
        next()
    } else {
        res.status(404).send()
    }
}