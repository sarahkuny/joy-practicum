require('dotenv').config();
const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const bcrypt = require('bcrypt')

//test route
router.get("/", (req, res) => {
    res.send("route works!")
})

//add user
router.post("/", async (req, res) => {
    const { username, password } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        db(`INSERT INTO users (username, password) VALUES (${username}, ${hashedPassword})`)
    } catch (err) {
        res.status(500).send(err)
    }
})


//login, receive jwt 
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        //select user info from users table
        const results = await db(`SELECT * FROM users WHERE username = ${username}`);
        const user = results.data[0];

        //if user exists
        if (user) {
            const userId = user.id;
            //compare input password with stored hashed password
            const correctPassword = await bcrypt.compare(password, user.password)
            //return error if password incorrect
            if (!correctPassword) return res.status(403).send("password incorrect");

            //send back token
            let token = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
            res.send(`token: ${token}`)
        } else {
            res.status(400).send("User does not exist")
        }
    } catch (err) {
        res.status(400).send(err)
    }
})


module.exports = router;
