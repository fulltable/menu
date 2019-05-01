const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'michaelsu',
  host: 'localhost',
  database: 'menusdb',
  port: 5432
});

exports.getMenus = (restaurantId, callback) => {
  pool.query(
    'SELECT DISTINCT menu FROM menuitems WHERE restaurantId = $1',
    [restaurantId],
    callback
  );
};

exports.getMenu = (restaurantId, menu, callback) => {
  pool.query(
    'SELECT item, type, price, description FROM menuitems WHERE restaurantId = $1 AND menu =$2',
    [restaurantId, menu],
    callback
  );
};
