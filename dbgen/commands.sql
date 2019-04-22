COPY menuitems FROM '/Users/michaelsu/Desktop/SDC/menu/dbgen/menuitems.csv' WITH (FORMAT csv);

create table restaurantid (id serial PRIMARY KEY);

CREATE TABLE menuitems (
  restaurantid INTEGER REFERENCES restaurantid(id), 
  itemid INTEGER,
  item varchar,
  description text,
  menu varchar,
  type varchar,
  price MONEY,
  PRIMARY KEY (itemid)
);

menus=# select * from menuitems where restaurantid=8948375;

menus=# select * from menuitems where item='Cotton Chicken';