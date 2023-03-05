const db = require("../models");
const moraliswebhook = require("../utils/moraliswebhook")
const Notification = db.notification;

// Create and Save a new Notification
exports.create = (req, res) => {
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req)
    if (postData == null || postData.length == 0) return res.send("No post data")

    postData.forEach(_postData => {
        // Save or update Notification in the database
        const notification = new Notification(_postData)
        notification.save().then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some err occurred."
            })
        })
    })

};

// Retrieve all Notification from the database.
exports.findAll = (req, res) => {
    Notification.find(req.query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some err occurred."
            });
        });
};