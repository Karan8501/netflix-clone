const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserRoute = require("./routes/UserRoute");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/netflix-api", {
    useNewUrlParser: true,
    UseUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB is connected");
  });

app.use("/api/user", UserRoute);
app.listen(5000, console.log("server is started"));
