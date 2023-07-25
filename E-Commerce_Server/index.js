const express = require('express');
const app = express();

require("./src/route/index")
require("./src/config/index")()

// app.use(require("./src/route"))

app.post('/register', (req, res) => {
    const parameter = req.body
    console.log(parameter);
    const result = register(parameter)
    res.send(result)
})


const port = process.env.port || 30002
app.listen(port, () => {
    console.log(`This server run on port: ${port}`);
})