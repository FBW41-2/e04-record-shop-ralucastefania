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

//ENV variable
const dBURL = process.env.DB_URL;
const dBPassword = process.env.DB_PASSWORD;
const dBUser = process.env.DB_USER;

/** CONNECT TO MONGODB **/
async function connectDB() {
  const url = `mongodb+srv://${dBUser}:${dBPassword}@${dBURL}`;
  const client = new MongoClient(url);

  try {
    await client.connect();
    app.locals.db = client.db("record-shop");
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
// app.use("/orders", ordersRouter);

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
