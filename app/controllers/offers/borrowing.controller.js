const db = require("../../models");
const moraliswebhook = require("../../utils/moraliswebhook")

const BorrowingOffer = db.borrowingOffer;

// Create and Save a new BorrowingOffer
exports.create = (req, res) => {
    // Create a BorrowingOffer

    // A new lending offer parameters will be sent via
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req);

    if (postData == null) {
        return res.send("No post data")
    }

    const offer = new BorrowingOffer(postData);

    // Save BorrowingOffer in the database
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
    BorrowingOffer.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
};

// Find a single BorrowingOffer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    BorrowingOffer.findById(id)
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

