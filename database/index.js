const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost/openTableMenu';

mongoose.connect(mongoUri, { useNewUrlParser: true });

const db = mongoose.connection;

module.exports = db;
