const express = require('express');
const app = express();
app.get("/t", function(request, response){
    response.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>express.js</title></head><body><h1>express.js</h1>files in folder new_level:<h2>package.json<br />app.js</h2>code in terminal:<h3>PS C:\\Users\\User\\Desktop\\сайт&gt; cd new_level<br />PS C:\\Users\User\\Desktop\\сайт\\new_level&gt; node app.js</h3>code in json file:<h3>{<br />  "name": "T-REXik",<br />  "version": "1.0.0",<br />  "dependencies": {<br />    "express":"^4.18.2"<br />  }<br />}</h3></body></html>`);
});
app.listen(24);