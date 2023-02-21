const db = require("../models");
const moraliswebhook = require("../utils/moraliswebhook")

const Request = db.request;
const offerController = require('./offers.controller')

// Create and Save a new/existing Request
exports.create = (req, res) => {
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req)
    if (postData == null) return res.send("No post data")

    // Save or update Request in the database
    Request.findOneAndUpdate(
        { requestId: postData.requestId }, // filter
        { $set: postData }, // data
        {
            upsert: true,
            returnNewDocument: true,
            returnDocument: "after"
        } // options
    ).then(data => {
        offerController.insertRequestId(postData.offerId, data._id)
        res.send(data)
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: err.message || "Some err occurred."
        })
    })
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

// Find a single Request with an id
exports.findOne = (req, res) => {
    let id = req.params.id
    Request.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving with id=" + id });
        });
};