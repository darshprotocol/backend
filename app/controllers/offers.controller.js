const db = require("../models");
const moraliswebhook = require("../utils/moraliswebhook")

const Offer = db.offer;

// Create and Save a new/existing Offer
exports.create = (req, res) => {
    // A new lending offer parameters will be sent via
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req)
    if (postData == null) return res.send("No post data")

    // Save or update Offer in the database
    Offer.findOneAndUpdate(
        { offerId: postData.offerId }, // filter
        postData, // data
        { upsert: true }, // options
        function (err, result) {
            if (!err) {
                if (!result) {
                    result = new Offer(postData);
                }
                result.save(function (error) {
                    if (error) {
                        res.status(500).send({
                            message: err.message || "Some error occurred."
                        })
                    }
                })
            }
        })
};

// Retrieve all Offer from the database.
exports.findAll = (req, res) => {
    Offer.find(req.query).populate('loans')
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            })
        })
};

// Insert loan id
exports.insertLoanId = (offerId, loanId) => {
    Offer.findOneAndUpdate(
        { offerId: offerId }, // filter
        { $push: { 'loans': loanId } }, // data
        { upsert: true }, // options
        function (err, result) {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred."
                })
            }
        })
}

// Insert request id
exports.insertRequestId = (offerId, requestId) => {
    Offer.findOneAndUpdate(
        { offerId: offerId }, // filter
        { $push: { 'requests': requestId } }, // data
        { upsert: true }, // options
        function (err, result) {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred."
                })
            }
        })
}

// Find a single Offer with an id
exports.findOne = (req, res) => {
    let id = req.params.id
    Offer.findById(id)
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