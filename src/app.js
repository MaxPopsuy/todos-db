const express = require("express");
const volleyball = require("volleyball");
require("dotenv").config();
const apiRouter = require("./routes/api");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(volleyball);
app.use(express.json());

app.use("/api/v1", apiRouter);

app.use(errorHandler);

module.exports = app;
