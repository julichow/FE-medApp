var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const moment = require('moment');

/* GET list of perscriptions
view data via postman GET: localhost:4000
*/

router.get("/", async (req, res, next) => {
  try {
    let results = await db("SELECT * FROM prescriptions;");
    console.log("RESULTS: ", results);
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* POST a new medication to the list
view data via postman POST: localhost:4000/prescriptions
*/

router.post("/prescriptions", async (req, res, next) => {
  const { name, dose, reason, frequency, doctor, date_time } = req.body;
  const formattedDateTime = moment(date_time).format('YYYY-MM-DD HH:mm:SS');
//console.log(req.body)
  try {
    //insert new medication. Id will be auto incremented
    await db(`INSERT INTO prescriptions (name, frequency, dose, reason, doctor, date_time) VALUES ('${name}', '${frequency}', '${dose}', '${reason}', '${doctor}', '${formattedDateTime}');`);
    //get an updated list of medications
    let results = await db("SELECT * FROM prescriptions;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* DELETE a medication to the list
view data via postman POST: localhost:4000/prescriptions/:id
*/

router.delete("/prescriptions/:id", async (req, res, next) => {
  const { id } = req.params;
//console.log(req.params)
  try {
    //delete medication with specified id
    await db(`DELETE FROM prescriptions WHERE id = ${id};`);
    //get an updated list of medications
    let results = await db("SELECT * FROM prescriptions;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* UPDATE a prescriptions to the list
view data via postman PUT: localhost:4000/prescriptions/:id
*/

router.put("/prescriptions/:id", async (req, res, next) => {
  const { id } = req.params;
  // console.log(req.params)
  const { name, dose, reason, frequency, doctor, date_time } = req.body;
  // console.log(req.body)
  const formattedDateTime = moment(date_time).format('YYYY-MM-DD HH:mm:SS');
  try {
    // Update the medication with the specified id
    await db(`UPDATE prescriptions SET name='${name}', dose='${dose}', reason='${reason}', frequency='${frequency}', doctor='${doctor}', date_time='${formattedDateTime}' WHERE id=${id};`);
    // Get an updated list of medications
    let results = await db("SELECT * FROM prescriptions;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
