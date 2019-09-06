const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

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

app.listen(port, '0.0.0.0', () =>
  console.log(`Example app listening on port ${port}!`),
);

const getCurrentData = () => {
  const data = fs.readFileSync('./data.json');
  return JSON.parse(data.toString());
};
