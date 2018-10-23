import express = require('express');
import bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());

app.post('/start', (req, res) => {

});