const db = require("../models");
const moraliswebhook = require("../utils/moraliswebhook")
const offer = require('./offers.controller')

const Transfer = db.transfer;

// Create and Save a new Transfer
exports.create = (req, res) => {
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req)
    if (postData == null || postData.length == 0) return res.send("No post data")

    postData.forEach(_postData => {
        // Save or update Offer in the database
        Transfer.findOneAndUpdate(
            { transferId: _postData.transferId }, // filter
            { $set: _postData }, // data
            {
                upsert: true,
                returnNewDocument: true,
                returnDocument: "after"
            } // options
        ).then(data => {
            offer.insertTransferId(_postData.offerId, data._id)
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some err occurred."
            })
        })
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