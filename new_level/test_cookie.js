const express = require("express");
const app = express();
const {signedCookie, signedCookies} = require("cookie-parser")
const cookieParser = require("cookie-parser");
//import cookieParser from 'cookie-parser';
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.get("/", function(request, response){
    response.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>cookie</title></head><body><form action="http://localhost:2025/user" method="post"><select name="testUser"><option value="new">new user</option><option value="test">test user</option></select><input type="submit"></form></body></html>`);
});
app.post('/user', (req, res) => {
    const testUser = req.body.testUser

    if (testUser === "new") {
        res.send(`<form action="http://localhost:2025/next" method="post"><input type="text" name="username"><input type="password" name="password"><input type="submit"></form>`)
    }
    if (testUser === "test") {
        res.send(`<form action="http://localhost:2025/next" method="post"><input type="password" name="testPassword"><input type="submit"></form>`)
    }
})
app.post('/next', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.cookies.artemius)

    if (username) {
        res.cookie('artemius', password, {
            path: '/next',
            maxAge: 1000 * 60 * 60 * 24 * 445
        })
        res.send(`<h1>Welcome</h1>`)
    } else {
        const testPassword = req.body.testPassword;
        const reqCookies = req.signedCookies;
        res.cookie('artemius', password, {
            path: '/next',
            maxAge: 1000 * 60 * 60 * 24 * 445
        })
        if (req.cookies === testPassword) {
            res.send(`<h1>Welcome</h1>`)
        } else {
            res.send(`<del>${testPassword}</del>`)
        }

        console.log(res.cookie.artemius);
        console.log(testPassword);
    }
})
app.listen(2025);