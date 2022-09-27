const express = require('express');
const dotenv = require('dotenv');
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();
const port = 8092; //process.env.PORT;

app.get('/', function (req, res) {
    res.send('Test');
});

app.post("/api/soknad", (req, res )=> {
    //res.status(500).json({yolo: "test"});
    ///*
    res.send({
        text: "OK",
        mottattDato: '2022-01-01T01:01:01'
    });
    //*/
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});