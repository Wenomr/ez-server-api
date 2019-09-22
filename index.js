const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {

    console.log(req.body);
    res.send("<h2>Your param was '"+ req.body.your_field +"'</h2>");
});

app.listen(3000, () => {
    console.log("Server started");
});