const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

mongoose.Promise = global.Promise;

const db = {}

db.mongoose = mongoose;
db.url = dbConfig.url;

db.loan = require("./loan.model.js")(mongoose);
db.lendingOffer = require("./offers/lending.model.js")(mongoose);
db.borrowingOffer = require("./offers/borrowing.model.js")(mongoose);

module.exports = db;