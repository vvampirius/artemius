const express = require("express");
const app = express();
const {signedCookie, signedCookies} = require("cookie-parser")
const cookieParser = require("cookie-parser");
let N = 0;
//import cookieParser from 'cookie-parser';
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.get('/url', (req, res) => {
    res.send(`<form action="http://localhost:2025"><button type="submit">http://localhost:2025</button></form>`)
})

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

    try {
        console.log(`Приняты куки =${JSON.stringify(req.cookies, null, 2)}`);
    } catch (error) {
        console.log(error);
    }

    console.log(`User в запросе: ${username}`)
    if (username) {
        res.cookie('User', password, {
            path: '/',
            maxAge: 1000 * 60 * 60 * 24
        })
        console.log(`Установлена кука User=${password}`)
        res.send(`<h1>Welcome, ${username}</h1>`)
    } else {
        //res.cookie('User', password, {
        //    path: '/',
        //    maxAge: 1000 * 60 * 60 * 24
        //})

        const testPassword = req.body.testPassword;

        const UserCookies = req.cookies.User;

        if (UserCookies.User === testPassword) {
            res.send(`<h1>Welcome</h1>`)
        } else {
            res.send(`<del>${testPassword}</del>`)
        }

        N = N + 1;
        console.log(N + UserCookies)
        N = N + 1;
        console.log(N + testPassword);
    }
})
app.listen(2025);