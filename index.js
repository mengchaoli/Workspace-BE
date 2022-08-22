const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/api", (req, res) => {
  console.log("accpeted!");
  return res.send("hi");
});

app.use("/auth", authRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

mongoose
  .connect("mongodb://localhost/myworkspace")
  .then((data) => {
    console.log(
      `MongoDb Database Connected to the Server : ${data.connection.host}`
    );
  })
  .catch((err) => {
    console.log(`Some Database Connection Error Occured :- ${err}`);
  });
// mongoose.connect("mongodb://localhost:27017/myapp");
app.listen(3001, () => {});
