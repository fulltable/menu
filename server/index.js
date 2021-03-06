const express = require('express');
const bodyParser = require('body-parser');
const MenuItem = require('../database/MenuItem');
const path = require('path');
const cors = require('cors');

const port = 3004;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/restaurants/:id', express.static(path.join(__dirname, '/../client/dist')));

app.get('/api/restaurants/:id/menus', (req, res) => {
  MenuItem.getMenus(req.params.id)
    .then(menus => res.send(menus));
});

app.get('/api/restaurants/:id/menus/:menu', (req, res) => {
  MenuItem.getMenu(req.params.id, req.params.menu)
    .then(menu => res.send(menu));
});


const server = app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});


module.exports = app;
module.exports.server = server;