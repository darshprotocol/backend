const db = require("../models");
const moraliswebhook = require("../utils/moraliswebhook")
const offer = require('./offers.controller')

const Loan = db.loan;

// Create and Save a new Loan
exports.create = (req, res) => {
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req)
    if (postData == null || postData.length == 0) return res.send("No post data")

    postData.forEach(_postData => {
        // Save or update loans in the database
        Loan.findOneAndUpdate(
            { loanId: _postData.loanId }, // filter
            { $set: _postData }, // data
            {
                upsert: true,
                returnNewDocument: true,
                returnDocument: "after"
            } // options
        ).then(data => {
            offer.insertLoanId(_postData.offerId, data._id)
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some err occurred."
            })
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

exports.findVault = (req, res) => {
    let address = req.query.address
    Loan.find({ $or: [{ lender: address }, { borrower: address }] })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some err occurred."
            });
        });
}