const express = require("express");
const app = express();
const {signedCookie, signedCookies} = require("cookie-parser")
const cookieParser = require("cookie-parser");
const { json } = require("stream/consumers");
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
        res.send(`<form action="http://localhost:2025/next" method="post"><input type="text" name="username" placeholder="username"><input type="password" name="password" placeholder="password"><input type="submit"></form>`)
    }
    if (testUser === "test") {
        res.send(`<form action="http://localhost:2025/next" method="post"><input type="password" name="testPassword" placeholder="password"><input type="submit"></form>`)
    }
})
app.post('/next', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let U = {Users: {}}
    const fs = require('fs')

    try {
        N = N + 1
        console.log(`Приняты куки ${JSON.stringify(req.cookies, null, 2)}`);
    } catch (error) {
        console.log(error);
    }

    N = N + 1
    console.log(`User в запросе: ${username}`)
    if (username) {
        res.cookie('User', username, {
            path: '/',
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        /*
        fs.readFile('Users.json', 'utf-8', (err, data) => {
            if(err) {
                console.error(err)
            } else {
                console.log(`data: ${data}`)
                console.log(`parse: ${JSON.parse(data)}`)
            }
        })
            */
        try {
    const data = fs.readFileSync('Users.json', 'utf-8');  // синхронное чтение
    console.log(`data: ${data}`);
    console.log(`parse:`, JSON.parse(data)); // выводим объект нормально
    U = JSON.parse(data)
} catch (err) {
    console.error(err);
}
        U.Users[`${username}`] = password
        fs.writeFile('Users.json', JSON.stringify(U, null, 2), {}, (err) => {
            if (err) {
                console.error(err)
            }
        });
        N = N + 1
        console.log(`Установлена кука Password: ${password}`)
        res.send(`<h1>Welcome, ${username}!</h1><div><form action="http://localhost:2025/games" method="post"><button type="submit">games</button></form></div>`)
    } else {
        //res.cookie('User', password, {
        //    path: '/',
        //    maxAge: 1000 * 60 * 60 * 24
        //})

        const testPassword = req.body.testPassword;

        let UKJSON = NaN
        const UserCookies = req.cookies.User;
        console.log(`User из куки: ${UserCookies}`)

        const UsersKeyJSON = fs.readFileSync('Users.json', 'utf-8');
        UKJSON = JSON.parse(UsersKeyJSON);

        const passInJson = UKJSON.Users[UserCookies]

        console.log(`password from UKJSON is ${passInJson}`);

        if (passInJson === testPassword) {
            let K = NaN;
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            const randomValue = getRandomInt(1, 999999);
            res.cookie('Key', randomValue, {
                path: '/',
                maxAge: 1000 * 60
            })
            try {
                const data = fs.readFileSync('keys.json', 'utf-8');
                console.log(`all keys: ${data}`);
                console.log(`parse:`, JSON.parse(data));
                K = JSON.parse(data)
            } catch (err) {
                console.error(err);
            }
            K.Keys[`${username}`] = randomValue
            fs.writeFile('Keys.json', JSON.stringify(K, null, 2), {}, (err) => {
                if (err) {
                    console.error(err)
                }
            });
            res.send(`<h1>Welcome!</h1><div><form action="http://localhost:2025/games" method="post"><button type="submit">games</button></form></div>`)
        } else {
            if(testPassword) {
                res.send(`<del>${testPassword}</del>`)
            } else {
                res.send(`<h1>Unable to load site</h1><br><br><br>Incorrect password`)
            }
        }

        N = N + 1;
        console.log(N + UserCookies)
        N = N + 1;
        console.log(N + testPassword);
    }
})
app.post('/games', (req, res) => {
    //let UKJSON = NaN
    //const Cookies = req.cookies;
    //console.log(`Key: ${Cookies.Key}`)
    //const UsersKeyJSON = fs.readFileSync('Keys.json', 'utf-8');
    //UKJSON = JSON.parse(UsersKeyJSON);
    //const passInJson = UKJSON.Users[UserCookies]
    res.send(`<h1>games</h1><!-- <nav><form method="post" action="http://localhost:2025/games/all"><button type="submit">all</button></form><br><form method="post" action="http://localhost:2025/games/favorite"><button type="submit">favorite</button></form></nav> -->`)
})
app.listen(2025);