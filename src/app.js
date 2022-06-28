const express = require("express");
const volleyball = require("volleyball");
const logger = volleyball.custom({ debug: true });
// const todosRouter = require()
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(logger);

app.use("./api/todos");

module.exports = app;
