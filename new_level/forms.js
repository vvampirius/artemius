    const express = require('express');
    const app = express();
    app.get("/start", function(request, response){
    response.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>form</title>
            </head>
            <body>
                <form action="http://192.168.88.6:100/form" method="post">
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
        console.log(req.body.code)
        res.send("<h1>form on server</h1><form action='http://192.168.88.6:100/next' method='post'><input name='next' type='search'><button type='submit'>next</button></form>")

        const fs = require('fs');
        const filename = 'text.txt';
        const content = "\n" + req.body.username + "\n" + req.body.password + "\n"

        fs.writeFile(filename, content, { flag: 'a'}, (err) => {
            if (err) {
                console.error(err)
            }
        });
    });
    app.post('/next', (req, res) => {
        res.send("<form action='http://192.168.88.6:100/finish' method='post'><input name='number' type='number' placeholder='1-100'>1<input name='test' type='range' min='1' max='100'>100<button type='submit'>test</button></form>")

        const fs = require('fs');
        const filename = 'text.txt';
        const content = req.body.next + "\n";

        fs.writeFile(filename, content, { flag: 'a'}, (err) => {
            if (err) {
                console.error(err)
            }
        });
    })
    app.post('/finish', (req, res) => {

        const fs = require('fs');
        const filename = 'text.txt';
        const content = req.body.number + "\n" + req.body.test + "\n";

        fs.writeFile(filename, content, { flag: 'a'}, (err) => {
            if (err) {
                console.error(err)
            }
        });
        fs.readFile('text.txt', 'utf8', (err, data) => {
          if (err) {
            console.error(err);
          } else {
            const filterData = "<h1>finish!</h1>" + "\n" + data + "\n";
            const finish = "finish:" + data
            res.send(filterData)
            console.log(finish)
            setTimeout(clearFile, 1)
          }
        });
        function clearFile() {
            const fileForClear = 'text.txt'
            fs.truncate(fileForClear, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
    })
app.listen(100);