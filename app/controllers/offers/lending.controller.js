const db = require("../../models");
const moraliswebhook = require("../../utils/moraliswebhook")

const LendingOffer = db.lendingOffer;

// Create and Save a new LendingOffer
exports.create = (req, res) => {
    // Create a LendingOffer

    // A new lending offer parameters will be sent via
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req);

    if (postData == null) {
        return res.send("No post data")
    }

    const offer = new LendingOffer(postData);

    // Save LendingOffer in the database
    offer.save(offer)
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
    LendingOffer.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
};

// Find a single LendingOffer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    LendingOffer.findById(id)
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