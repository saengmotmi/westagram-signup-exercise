require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./errorHandler");

const { PORT } = require("./config");
const { setContentTypeDefault } = require("./middleware");

const app = express();

app.use(cors());
app.use(setContentTypeDefault());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/", require("./routes"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("app listening on port at " + PORT);
});

module.exports = app;
