const db = require("../../models");
const moraliswebhook = require("../../utils/moraliswebhook")

const BorrowingRequest = db.borrowingRequest;

// Create and Save a new/existing BorrowingRequest
exports.create = (req, res) => {
    // A new lending offer parameters will be sent via
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req)
    if (postData == null) return res.send("No post data")

    // Save or update BorrowingRequest in the database
    BorrowingRequest.findOneAndUpdate(
        { requestId: postData.requestId }, // filter
        postData, // data
        { upsert: true }, // options
        function (err, result) {
            if (!err) {
                if (!result) {
                    result = new BorrowingRequest(postData);
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

// Retrieve all BorrowingRequest from the database.
exports.findAll = (req, res) => {
    BorrowingRequest.find(req.query)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            })
        })
};

// Find a single BorrowingRequest with an id
exports.findOne = (req, res) => {
    BorrowingRequest.findById(req.params.id)
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