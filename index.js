const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/api", (req, res) => {
  console.log("accpeted!");
  return res.send("hi");
});

// app.post("/", (req, res, next) => {
//   console.log("body is >>>", req.body);
// });

app.listen(3001);
