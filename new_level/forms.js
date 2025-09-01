    const express = require('express');
    const fs = require("fs");
    const app = express();
    //192.168.88.6
    app.get("/start", function(request, response){
    response.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>form</title>
            </head>
            <body>
                <form action="http://localhost:100/form" method="post">
                    <input name="code" type="hidden" value="T-REX.ik0024">
                    <input name="username" type="text" placeholder="username">
                    <input name="password" type="password" placeholder="password">
                    <button type="submit">submit form</button>
                </form>
            </body>
        </html>
        `);
    });
    app.use(express.urlencoded({ extended: true }));

    app.post('/form', (req, res) => {
        console.log('code:', req.body.code);
        console.log('Username:', req.body.username);
        console.log('Password:', req.body.password);
        res.send("<h1>form on server</h1><form action='http://localhost:100/next' method='post'><input name='next' type='search'><button type='submit'>next</button></form>")

        const fs = require('fs');
        const filename = 'text.txt';
        const content = req.body.username + req.body.password
        console.log(content)

        fs.writeFile(filename, content, (err) => {
            if (err) {
                console.error(err)
            }
        });
    });
    app.post('/next', (req, res) => {
        console.log(req.body.next);
        res.send("<form action='http://localhost:100/finish' method='post'><input name='number' type='number' placeholder='1-100'>1<input name='test' type='range' min='1' max='100'>100<button type='submit'>test</button></form>")

        const fs = require('fs');
        const filename = 'text.txt';
        const content = req.body.next;

        fs.writeFile(filename, content, (err) => {
            if (err) {
                console.error(err)
            }
        });
    })
    app.post('/finish', (req, res) => {
        console.log('number:', req.body.number)
        console.log('range:', req.body.test)
        res.send("<h1>finish!</h1>")

        const fs = require('fs');
        const filename = 'text.txt';
        const content = req.body.number + req.body.test;

        fs.writeFile(filename, content, (err) => {
            if (err) {
                console.error(err)
            }
        });
    })
app.listen(100);