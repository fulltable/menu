require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const MenuItem = require('../database/MenuItem');
const path = require('path');
const cors = require('cors');
const db = require('../database/postgresQueries');

const port = 3004;
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  '/restaurants/:id',
  express.static(path.join(__dirname, '/../client/dist'))
);

app.get('/api/restaurants/:id/menus', (req, res) => {
  db.getMenus(req.params.id, (error, results) => {
    if (error) {
      res.sendStatus(500);
    }
    let menusArray = [];
    for (let i = 0; i < results.rows.length; i++) {
      menusArray.push(results.rows[i].menu);
    }
    res.send(menusArray);
  });
});

app.get('/api/restaurants/:id/menus/:menu', (req, res) => {
  db.getMenu(req.params.id, req.params.menu, (error, results) => {
    if (error) {
      res.sendStatus(500);
    }
    res.send(results.rows);
  });
});

const server = app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});

module.exports = app;
module.exports.server = server;
