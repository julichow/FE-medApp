var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const moment = require('moment');

// GET list of medications 
// router.get("/", function (req, res, next) {
//   db("SELECT * FROM medications;")
//     .then((result) => {
//       res.send(result.data);
//     })
//     .catch((err) => res.status(500).send(err));
// });

/* GET list of medications
view data via postman GET: localhost:4000
*/

router.get("/", async (req, res, next) => {
  try {
    let results = await db("SELECT * FROM medications;");
    // console.log("RESULTS: ", results);
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// POST a new medication to the list
// router.post("/", function (req, res, next) {
//   let name = req.body.name;
//   let dose = req.body.dose;
//   let reason = req.body.reason;
//   let frequency = req.body.frequency;
//   let doctor = req.body.doctor;
//   db(
//     `INSERT INTO medications (name, dose, reason, frequency, doctor) VALUES ('${name}','${dose}','${reason}','${frequency}','${doctor}');`
//   ).then((result) => {
//     //using .then return the list of medications from GET
//     db("SELECT * FROM medications;")
//       .then((result) => {
//         res.send(result.data);
//       })
//       .catch((err) => res.status(500).send(err));
//   });
// });

/* POST a new medication to the list
view data via postman POST: localhost:4000/medications
*/

router.post("/medications", async (req, res, next) => {
  const { name, dose, reason, frequency, doctor, date_time } = req.body;
  const formattedDateTime = moment(date_time).format('YYYY-MM-DD HH:mm:SS');
//console.log(req.body)
  try {
    //insert new medication. Id will be auto incremented
    await db(`INSERT INTO medications (name, frequency, dose, reason, doctor, date_time) VALUES ('${name}', '${frequency}', '${dose}', '${reason}', '${doctor}', '${formattedDateTime}');`);
    //get an updated list of medications
    let results = await db("SELECT * FROM medications;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// router.delete("/:id", function (req, res) {
//   console.log(req.params.id);
//   db(`DELETE FROM medications WHERE id = ${req.params.id};`).then((result) => {
//     db("SELECT * FROM medications;")
//       .then((result) => {
//         res.send(result.data);
//       })
//       .catch((err) => res.status(500).send(err));
//   });
// });

/* DELETE a medication to the list
view data via postman POST: localhost:4000/medications/:id
*/

router.delete("/medications/:id", async (req, res, next) => {
  const { id } = req.params;
//console.log(req.params)
  try {
    //delete medication with specified id
    await db(`DELETE FROM medications WHERE id = ${id};`);
    //get an updated list of medications
    let results = await db("SELECT * FROM medications;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* UPDATE a medication to the list
view data via postman PUT: localhost:4000/medications/:id
*/

router.put("/medications/:id", async (req, res, next) => {
  const { id } = req.params;
  //console.log(req.params)
  const { name, dose, reason, frequency, doctor, date_time } = req.body;
  //console.log(req.body)
  const formattedDateTime = moment(date_time).format('YYYY-MM-DD HH:mm:SS');
  try {
    // Update the medication with the specified id
    await db(`UPDATE medications SET name='${name}', dose='${dose}', reason='${reason}', frequency='${frequency}', doctor='${doctor}', date_time='${formattedDateTime}' WHERE id=${id};`);
    // Get an updated list of medications
    let results = await db("SELECT * FROM medications;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
