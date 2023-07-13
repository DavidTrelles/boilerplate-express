let express = require("express");
let app = express();
require("dotenv").config();
let bodyParser = require("body-parser");
// app.get("/", function (req, res) {
//   res.send("Hello Express");
// });
app.use("/", function (req, res, next) {
  console.log(req.method, req.path, " - ", req.ip);
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/name", function (req, res) {
  let firstName = req.body.first;
  let lastName = req.body.last;
  res.json({
    name: `${firstName} ${lastName}`,
  });
});
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);
app.get(
  "/:word/echo",
  function (req, res, next) {
    word = req.params.word;
    next();
  },
  function (req, res) {
    res.json({ echo: word });
  }
);
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});
app.get("/name", function (req, res) {
  let firstName = req.query.first;
  let lastName = req.query.last;
  res.json({
    name: `${firstName} ${lastName}`,
  });
});
app.use("/public", express.static(__dirname + "/public"));
console.log("Hello World");

module.exports = app;
