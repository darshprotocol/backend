const db = require("../models");
const moraliswebhook = require("../utils/moraliswebhook")
const offer = require('./offers.controller')

const Request = db.request;

// Create and Save a new/existing Request
exports.create = (req, res) => {
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req)
    if (!postData || postData == []) return res.send("No post data")

    postData.forEach(_postData => [
        // Save or update Request in the database
        Request.findOneAndUpdate(
            { requestId: _postData.requestId }, // filter
            { $set: _postData }, // data
            {
                upsert: true,
                returnNewDocument: true,
                returnDocument: "after"
            } // options
        ).then(data => {
            offer.insertRequestId(_postData.offerId, data._id)
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some err occurred."
            })
        })
    ])
};

// Retrieve all Request from the database.
exports.findAll = (req, res) => {
    Request.find(req.query)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some err occurred."
            })
        })
};