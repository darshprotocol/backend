const db = require("../models");
const moraliswebhook = require("../utils/moraliswebhook")

const Loan = db.loan;
const OfferController = require('./offers.controller')

// Create and Save a new Loan
exports.create = (req, res) => {
    // A new lending offer parameters will be sent via
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req)
    if (postData == null) return res.send("No post data")

    // Save BorrowingOffer in the database
    Loan.findOneAndUpdate(
        { loanId: postData.loanId }, // filter
        postData, // data
        { upsert: true }, // options
        function (err, result) {
            if (!err) {
                if (!result) {
                    result = new Loan(postData);
                }
                result.save(function (error) {
                    if (error) {
                        res.status(500).send({
                            message: err.message || "Some error occurred."
                        })
                    }
                    OfferController.insertLoanId(postData.offerId, result._id)
                })
            }
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
                message: err.message || "Some error occurred."
            });
        });
};

// Find a single Loan with an id
exports.findOne = (req, res) => {
    Loan.findById(req.params.id)
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