var express = require("express");
var router = express.Router();
const db = require("../model/helper");
require("dotenv").config();

//1. install jsonwebtoken & bcrypt packages
//2. require jsonwebtoken & bcrypt
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt")

//variable needed for bcrypt to do the encryption 
//saltRounds - how many times it runs the algorithms. The higher the saltRounds, the slower it runs
const saltRounds = 10;
//variable needed for creating the token
const supersecret = process.env.SUPER_SECRET;

// /* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

/*****  REGISTRATION *****/

router.post("/register", async (req, res) => {
  //1. get user info from request body
  const { name, email, username, password } = req.body;
  try {
//2. encrypt password using bcrypt.hash()
    const hashedPwd = await bcrypt.hash(password, saltRounds)
    console.log(hashedPwd);
//3. create a new user on DB to store user credentials 
    await db(`INSERT into users (name, email, username, password) VALUES ('${name}', '${email}, '${username}, '${hashedPwd}');`);
  //4. respond with ok
    res.status(200).send({ message: "Registration successful" });
  } catch (err) {
    res.status(400).send({error: err.message})
  }
});

/***** LOGIN *****/

router.post("/login", async (req, res) => {
  const { username, password } = req.body
  try {
    //1. check if user exits on DB
    const results = await db(`SELECT * FROM users WHERE username = '${username};`);
    console.log(results);
    //DB returns an object with data array
    const user = results.data[0];
    if (user) {
      //2. check if password correct (compare passwords = 'bcrypt.compare()')
      //bcrypt.compare compares the password received with password from DB 
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) res.status(401).send({ message: "Password incorrect" });
      
      //3. create token using user id (=> 'sign()')
      //receive user id from DB
      let payload = { userID: user.id };
      const token = jwt.sign(payload, supersecret);
      //4. respond with token
      res.status(200).send(token);
    } else {
      res.status(401).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
});

/***** CLIENT: LOGIN FOR USERS ONLY *****/

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
})
module.exports = router;
