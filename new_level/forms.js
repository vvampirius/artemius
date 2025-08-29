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
          console.log('code:', req.body.code);
          console.log('Username:', req.body.username);
          console.log('Password:', req.body.password);
          res.send("<h1>form on server</h1>")

          const fs = require('fs');
          const filename = 'text.txt';
          const content = "NaN";

          fs.writeFile(filename, content, (err) => {
            if (err) {
                console.error(err)
                res.send(`<script>console.error("error")</script>`)
            }
          });
    });
app.listen(100);