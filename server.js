const express = require("express");

const app = express();
const mongoose = require("mongoose");
const userRouter = require("./Routes/API/user/index");
const tripRouter = require("./Routes/API/trip/index");

// dotnv
require("dotenv").config();
let mongoUri = "";
console.log(process.env.NODE_ENV, "process.env.NODE_ENV");
switch (process.env.NODE_ENV) {
  case "dev":
    mongoUri = process.env.MONGO_URI_LOCAL;
    break;
  case "prod":
    mongoUri = process.env.MONGO_URI_PRODUCT;
    break;
  default:
    break;
}
// mongoUri =
//   process.env.NODE_ENV === "prod"
//     ? process.env.MONGO_URI_LOCAL
//     : process.env.MONGO_URI_PRODUCT;

console.log(mongoUri, "mongoUri");

mongoose
  .connect(mongoUri, { userNewUrlParser: true })
  .then(() => console.log("connected sucessfull "))
  .catch(err => console.log(err));

// public
app.use("/", express.static("public"));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// middlewarae serve static files
app.use("/uploads/avartas", express.static("./uploads/avartas"));

// test

// router handler
app.use("/api/users", userRouter);
app.use("/api/trips", tripRouter); /// call api trip
const port = process.env.PORT; // lay post cua process hoac 5000

app.listen(port, () => {
  console.log(`App running on port ${port} `);
});
