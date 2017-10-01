const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI , {
  useMongoClient: true
});

module.exports = {mongoose};