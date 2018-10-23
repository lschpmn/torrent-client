import bodyParser = require('body-parser');
import cors = require('cors');
import express = require('express');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/add', (req, res) => {
  console.log(req.body);
  res.send({ status: 'added' });
});

app.listen(3000);
console.log('Server started on port 3000');