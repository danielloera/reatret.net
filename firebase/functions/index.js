const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
var bodyParser = require('body-parser');

const app = express();


// parse application/json
const jsonParser = bodyParser.json();

app.use(cors({ origin: true }));
const API_URL = "http://54.218.147.176/codeswitch";

app.post('/', jsonParser, (req, res) => {
    console.log("BODY");
    console.log(typeof req.body, req.body)
    const DATA = {text: req.body.text};
    return axios.post(API_URL, DATA).then((response)=> {
        console.log("DATA");
        console.log(response.data);
        res.send(response.data);
    }).catch((err) => {
        console.log("UH OHHHH");
        console.log(err);
        console.log("REQUEST");
        console.log(req);
        res.send("oops");
    });
});

exports.codeswitch = functions.https.onRequest(app);
