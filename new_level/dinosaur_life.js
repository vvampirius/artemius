const express = require('express');
const app = express();

app.post("/dino", function(request, response){
    response.send(`
        <html>
            <body>    
                <strong id="I">🦖</strong><!-- дино -->
            </body>
        </html>
        `);
});

app.listen(777);