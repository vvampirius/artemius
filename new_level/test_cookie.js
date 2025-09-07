const express = require("express");
const {signedCookie, signedCookies} = require("cookie-parser");
const app = express();

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
    const testPassword = req.body.testPassword;

    if (username) {
        res.cookie(username, password, {
            maxAge: 1000 * 60 * 60 * 24 * 445
        })
    } else {
        res.cookie(username, password, {
            maxAge: 1000 * 60 * 60 * 24 * 445
        })
        const cookieParser = require("cookie-parser");
        app.use(cookieParser());
        console.log(req.cookies);
    }
    res.send(`${req.cookies.password}`)
})
app.listen(2025);