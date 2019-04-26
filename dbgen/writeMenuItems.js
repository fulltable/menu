const faker = require('faker');
const fs = require('fs');
let itemID = 0;
const rowData = i => {
  itemID++;
  const menuChoices = {
    0: 'Breakfast',
    1: 'Lunch',
    2: 'Dinner',
    3: 'Brunch',
    4: 'Weekend',
    5: 'Special',
    6: 'Kids',
    7: 'Holiday',
    8: 'Wine',
    9: 'Drinks',
    10: 'Beer'
  };
  const typeChoices = {
    0: 'Appetizers',
    1: 'Snacks',
    2: 'Entrees',
    3: 'Tapas',
    4: 'Dessert',
    5: 'Sides',
    6: 'Main',
    7: 'Special'
  };

  const randomMenu = Object.keys(menuChoices)[
    Math.floor(Math.random() * Math.floor(Object.keys(menuChoices).length))
  ];

  const randomType = Object.keys(typeChoices)[
    Math.floor(Math.random() * Math.floor(Object.keys(typeChoices).length))
  ];
  let restaurantID = i;
  const item = [
    faker.commerce.productMaterial(),
    faker.commerce.product()
  ].join(' ');
  const description = faker.lorem.sentence();
  const menu = menuChoices[randomMenu];
  const type = typeChoices[randomType];
  const price = (faker.commerce.price() / 100 + 3).toFixed(2);
  const result = `${restaurantID},${itemID},${item},${description},${menu},${type},${price}`;
  return result;
  // , description, menu, type, price;
};

const writerID = fs.createWriteStream(__dirname + '/restaurantID.csv', 'utf8');
const writerMenu = fs.createWriteStream(__dirname + '/menuitems2.csv', 'utf8');
const write10Milli = (writer, encoding, callback) => {
  let i = 10000001;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 1) {
        for (let j = 1; j <= 3; j++) {
          let data = rowData(i);
          // data.restaurantId = i;
          // data = JSON.stringify(data);
          writer.write(`${data}\n`, encoding, callback);
        }
      } else {
        for (let k = 1; k <= 3; k++) {
          let data = rowData(i);
          // data.restaurantId = i;
          // data = JSON.stringify(data);
          ok = writer.write(`${data}\n`, encoding);
        }
      }
    } while (i > 1 && ok);
    if (i > 1) {
      writer.once('drain', write);
    }
  }
};

const write10MID = (writer, encoding, callback) => {
  let i = 10000001;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 1) {
        let data = i;
        writer.write(`${data}\n`, encoding, callback);
      } else {
        let data = i;
        ok = writer.write(`${data}\n`, encoding);
      }
    } while (i > 1 && ok);
    if (i > 1) {
      writer.once('drain', write);
    }
  }
};

// write10MID(writerID, 'utf8', () => {
//   console.log('Done!');
// });

write10Milli(writerMenu, 'utf8', () => {
  console.log('Done!');
});
