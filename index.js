const express = require("express");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post(
  "/api/fileanalyse",
  upload.single("upfile"),
  function (req, res, next) {
    // req.files holds array of all the data
    // req.body will contain the text fields, if there were any
    const name = req.file.originalname;
    const type = req.file.mimetype;
    const size = req.file.size;
    res.json({ name: name, type: type, size: size });
  }
);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
