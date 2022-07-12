const express = require("express");
const volleyball = require("volleyball");
require("dotenv").config();
const mongoose = require("mongoose");

const apiRouter = require("./routes/api");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db connected"))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });

app.use(volleyball);
app.use(express.json());

app.use("/api/v1", apiRouter);

app.use(errorHandler);

module.exports = app;
