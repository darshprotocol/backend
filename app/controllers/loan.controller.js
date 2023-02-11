const db = require("../models");
const moraliswebhook = require("../utils/moraliswebhook")

const Loan = db.loan;

// Create and Save a new Loan
exports.create = (req, res) => {
    // Create a Loan

    // A new lending offer parameters will be sent via
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req);

    if (postData == null) {
        return res.send("No post data")
    }

    const loan = new Loan(postData);

    // Save Loan in the database
    loan.save(loan)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    Loan.find({})
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
    const id = req.params.id;

    Loan.findById(id)
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