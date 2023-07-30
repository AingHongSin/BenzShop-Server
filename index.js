const express = require('express');
const app = express();

app.use(express.json());

require("./src/config/index")()
require("./src/config/session")(app)

app.use(require("./src/route/index"))

 



const port = process.env.port || 30002
app.listen(port, () => {
    console.log(`This server run on port: ${port}`);
})