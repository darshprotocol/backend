const db = require("../models");
const moraliswebhook = require("../utils/moraliswebhook")

const Request = db.request;
const OfferController = require('./offers.controller')

// Create and Save a new/existing Request
exports.create = (req, res) => {
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req)
    if (postData == null) return res.send("No post data")

    // Save or update Request in the database
    Request.findOneAndUpdate(
        { requestId: postData.requestId }, // filter
        postData, // data
        { upsert: true }, // options
        function (err, result) {
            if (!err) {
                console.log('Not Err');
                if (!result) {
                    console.log('Not result');
                    result = new Request(postData);
                    console.log('1', result._id);
                    OfferController.insertRequestId(postData.offerId, result._id)
                    result.save(function (err) {
                        if (err) {
                            console.log('Saving failed', err);
                            res.status(500).send({
                                message: err.message || "Some err occurred."
                            })
                        }
                    })
                    console.log('2', result._id);
                }
            }
            console.log('Yes Err', err);
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