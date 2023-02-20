const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

mongoose.Promise = global.Promise;

const db = {}

db.mongoose = mongoose;
db.url = dbConfig.url;

db.loan = require("./loans.model.js")(mongoose);
db.offer = require("./offers.model.js")(mongoose);
db.request = require("./requests.model.js")(mongoose);
db.user = require("./users.model.js")(mongoose);
db.transfer = require("./transfers.model.js")(mongoose);

module.exports = db;