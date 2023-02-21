const db = require("../models");
const moraliswebhook = require("../utils/moraliswebhook")

const Offer = db.offer;

// Create and Save a new/existing Offer
exports.create = (req, res) => {
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req)
    if (postData == null) return res.send("No post data")

    // Save or update Offer in the database
    Offer.findOneAndUpdate(
        { offerId: postData.offerId }, // filter
        { $set: postData }, // data
        {
            upsert: true,
            returnNewDocument: true,
            returnDocument: "after"
        } // options
    ).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some err occurred."
        })
    })
}

// Retrieve all Offer from the database.
exports.findAll = (req, res) => {
    Offer.find(req.query).populate('loans')
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some err occurred."
            })
        })
};

// Insert loan id
exports.insertLoanId = (offerId, loanId) => {
    Offer.findOneAndUpdate(
        { offerId: offerId }, // filter
        { $addToSet: { 'loans': loanId } }, // data
        {
            upsert: true,
            returnNewDocument: true,
            returnDocument: "after"
        } // options
    ).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    })
}

// Insert request id
exports.insertRequestId = (offerId, requestId) => {
    Offer.findOneAndUpdate(
        { offerId: offerId }, // filter
        { $addToSet: { 'requests': requestId } }, // data
        {
            upsert: true,
            returnNewDocument: true,
            returnDocument: "after"
        } // options
    ).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    })
}

// Insert request id
exports.insertTransferId = (offerId, transferId) => {
    Offer.findOneAndUpdate(
        { offerId: offerId }, // filter
        { $addToSet: { 'transfers': transferId } }, // data
        {
            upsert: true,
            returnNewDocument: true,
            returnDocument: "after"
        } // options
    ).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    })
}

// Find a single Offer with an id
exports.findOne = (req, res) => {
    let id = req.params.id
    Offer.findById(id).populate(['loans', 'requests', 'transfers'])
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving with id=" + id
            });
        });
};