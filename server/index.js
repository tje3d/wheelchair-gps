const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  res.json(getCurrentData());
});

app.get('/update', (req, res) => {
  const data = getCurrentData();
  let found = false;

  data.forEach(item => {
    if (item.name === req.query.name) {
      item.lat = req.query.lat;
      item.lng = req.query.lng;
      found = true;
    }
  });

  if (!found) {
    data.push(req.query);
  }

  fs.writeFileSync('./data.json', JSON.stringify(data));

  res.send('');
});

https
  .createServer(
    {
      key: fs.readFileSync('../key.pem'),
      cert: fs.readFileSync('../cert.pem'),
    },
    app,
  )
  .listen(3000);

console.log('Server started: https://localhost:8080');

const getCurrentData = () => {
  const data = fs.readFileSync('./data.json');
  return JSON.parse(data.toString());
};
