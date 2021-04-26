/** EXTERNAL DEPENDENCIES */
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { MongoClient } = require("mongodb");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

/** ROUTERS */
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const recordsRouter = require("./routes/records");
const ordersRouter = require("./routes/orders");
const { setCors } = require("./middleware/security");

/** INIT */
const app = express();

/** LOGGING */
app.use(logger("dev"));

/** CONNECT TO MONGODB **/
async function connectDB() {
  const url =
    "mongodb+srv://Raluca:7HFnyNIFLcH57sMF@cluster0.gdgwl.mongodb.net/record-shop?retryWrites=true&w=majority";
  const client = new MongoClient(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  try {
    await client.connect();
    app.locals.db = client.db("record-shop");
    client.db().collection('records').find().toArray()
    await listDatabases(client);
  } catch (error) {
  } finally {
    // await client.close();
  }
}

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

connectDB().catch(console.error);

/** SETTING UP LOWDB */
// const adapter = new FileSync('data/db.json');
// const db = low(adapter);
// db.defaults({
//     records: [],
//     users: [],
//     orders: []
// }).write();

/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(setCors);

/** STATIC FILES*/
app.use(express.static(path.join(__dirname, "public")));

/** ROUTES */
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/records", recordsRouter);
app.use("/orders", ordersRouter);

/** ERROR HANDLING */
app.use(function (req, res, next) {
  const error = new Error("Looks like something broke...");
  error.status = 400;
  next(error);
});

app.use(function (err, req, res, next) {
  res.send({
    error: {
      message: err.message,
    },
  });
});

/** EXPORT PATH */
module.exports = app;
