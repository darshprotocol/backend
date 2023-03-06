const db = require("../models");
const moraliswebhook = require("../utils/moraliswebhook")
const Notification = db.notification;
const Offer = db.offer;

// Create and Save a new Notification
exports.create = async (req, res) => {
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req)
    if (postData == null || postData.length == 0) return res.send("No post data")

    for (let index = 0; index < postData.length; index++) {
        const _postData = postData[index]
        let offer = null;

        console.log('notification', postData);

        try {
            offer = await Offer.find({ offerId: postData.fieldId })
            console.log(offer);
        } catch (error) {
            console.error(error);
        }

        // Save or update Notification in the database
        const notification = new Notification(_postData)

        if (offer) {
            _postData.offerId = offer._id;
        }

        notification.save().then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some err occurred."
            })
        })

    }
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

exports.markAsRead = (req, res) => {
    Notification.findOneAndUpdate(
        { _id: req.params.id }, // filter
        { $set: { readAt: (Date.now() / 1000) } }, // data
        {
            upsert: false,
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

exports.markAllAsRead = (req, res) => {
    Notification.updateMany(
        { to: req.query.to, readAt: 0 }, // filter
        { $set: { readAt: (Date.now() / 1000) } }, // data
        {
            upsert: false,
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