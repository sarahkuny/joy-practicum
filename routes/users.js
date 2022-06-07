require('dotenv').config();
const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

router.use(express.json())

//test route
// router.get("/", async (req, res) => {
//     try {
//         const results = await db(`SELECT * FROM users;`);
//         if (results.data.length){
//             res.status(200).send(results.data)
//         } else {
//             res.status(404).send("No users in database")
//         }
//     } catch (err){
//         res.status(500).send(err)
//     }
// })

//add user
router.post("/", async (req, res) => {
    const { username, password } = req.body;
    try{
        let { data } = await db(`SELECT username FROM users`);
        let userExists = data.find((user) => (user.username === username))
        if(userExists) {
            res.sendStatus(401);
        }
        if(userExists === undefined) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db(`INSERT INTO users (username, password) VALUES ("${username}", "${hashedPassword}");`);
            res.status(200).send("User added")        
        }
    } catch (err) {
        res.status(500).send(err)
    }
})


//login, receive jwt 
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        //select user info from users table
        const results = await db(`SELECT * FROM users WHERE username = "${username}";`);
        const user = results.data[0];

        //if user exists
        if (user) {
            //compare input password with stored hashed password
            const correctPassword = await bcrypt.compare(password, user.password);
            //return error if password incorrect
            if (!correctPassword) return res.sendStatus(401);

            //send back token
            
            var token =  jwt.sign( username, process.env.ACCESS_TOKEN_SECRET);
            res.send(token)
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.status(400).send(err)
    }
})


module.exports = router;
