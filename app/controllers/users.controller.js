const db = require("../models");
const moraliswebhook = require("../utils/moraliswebhook")

const User = db.user;

// Create and Save a new User
exports.create = (req, res) => {
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req)
    if (postData == null || postData.length == 0) return res.send("No post data")

    postData.forEach(_postData => {
        // Save or update Offer in the database
        User.findOneAndUpdate(
            { address: _postData.address }, // filter
            { $set: _postData }, // data
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
    })

};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
    User.find(req.query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some err occurred."
            });
        });
};

// Find a single User with an address
exports.findOne = (req, res) => {
    let address = req.params.address
    User.findOne({ address: address })
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