const db = require("../models");
const moraliswebhook = require("../utils/moraliswebhook")

const Loan = db.loan;
const offerController = require('./offers.controller')

// Create and Save a new Loan
exports.create = (req, res) => {
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req)
    if (postData == null) return res.send("No post data")

    // Save or update loans in the database
    Loan.findOneAndUpdate(
        { loanId: postData.loanId }, // filter
        { $set: postData }, // data
        {
            upsert: true,
            returnNewDocument: true,
            returnDocument: "after"
        } // options
    ).then(data => {
        offerController.insertLoanId(data.offerId, data._id)
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some err occurred."
        })
    })
};

// Retrieve all Loan from the database.
exports.findAll = (req, res) => {
    Loan.find(req.query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some err occurred."
            });
        });
};

// Find a single Loan with an id
exports.findOne = (req, res) => {
    let id = req.params.id
    Loan.findById(id)
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