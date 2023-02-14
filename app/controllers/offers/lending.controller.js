const db = require("../../models");
const moraliswebhook = require("../../utils/moraliswebhook")

const LendingOffer = db.lendingOffer;

// Create and Save a new/existing LendingOffer
exports.create = (req, res) => {
    // A new lending offer parameters will be sent via
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req)
    if (postData == null) return res.send("No post data")

    // Save or update LendingOffer in the database
    LendingOffer.findOneAndUpdate(
        { offerId: postData.offerId }, // filter
        postData, // data
        { upsert: true }, // options
        function (err, result) {
            if (!err) {
                if (!result) {
                    result = new LendingOffer(postData);
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

// Retrieve all LendingOffer from the database.
exports.findAll = (req, res) => {
    LendingOffer.find(req.query)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            })
        })
};

// Find a single LendingOffer with an id
exports.findOne = (req, res) => {
    LendingOffer.findById(req.params.id)
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