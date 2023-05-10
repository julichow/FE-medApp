var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET list of medications */
router.get("/", function (req, res, next) {
  db("SELECT * FROM medications;")
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => res.status(500).send(err));
});

// POST a new medication to the list
router.post("/", function (req, res, next) {
  let name = req.body.name;
  let reason = req.body.reason;
  let frequency = req.body.frequency;
  db(
    `INSERT INTO medications (name, reason, frequency) VALUES ('${name}', '${reason}', '${frequency}');`
  ).then((result) => {
    //then return the list of medications from GET
    db("SELECT * FROM medications;")
      .then((result) => {
        res.send(result.data);
      })
      .catch((err) => res.status(500).send(err));
  });
});

module.exports = router;
