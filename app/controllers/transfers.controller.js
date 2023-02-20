const db = require("../models");
const moraliswebhook = require("../utils/moraliswebhook")

const Transfer = db.transfer;

// Create and Save a new Transfer
exports.create = (req, res) => {
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req)
    if (postData == null) return res.send("No post data")

    console.log(postData);

    // Save or update loans in the database
    let transfer = new Transfer(postData)
    transfer.save(function (err) {
        if (err) {
            console.log('Saving failed', err);
            res.status(500).send({
                message: err.message || "Some err occurred."
            })
        }
        res.send(transfer)
    })
};

// Retrieve all Transfer from the database.
exports.findAll = (req, res) => {
    Transfer.find(req.query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some err occurred."
            });
        });
};