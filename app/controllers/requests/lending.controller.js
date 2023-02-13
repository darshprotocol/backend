const db = require("../../models");
const moraliswebhook = require("../../utils/moraliswebhook")

const LendingRequest = db.lendingRequest;

// Create and Save a new/existing LendingRequest
exports.create = (req, res) => {
    // A new lending offer parameters will be sent via
    // a POST REQUEST from the smart contract through moralis stream

    const postData = moraliswebhook.resolve(req)
    if (postData == null) return res.send("No post data")

    // Save or update LendingRequest in the database
    LendingRequest.findOneAndUpdate(
        { requestId: postData.requestId }, // filter
        postData, // data
        { upsert: true }, // options
        function (err, result) {
            if (!err) {
                if (!result) {
                    result = new LendingRequest(postData);
                }
                result.save(function (error) {
                    if (!error) {
                        res.send(result)
                    } else {
                        res.status(500).send({
                            message: err.message || "Some error occurred."
                        })
                    }
                })
            }
            res.send(result);
        })
};

// Retrieve all LendingRequest from the database.
exports.findAll = (req, res) => {
    LendingRequest.find(req.query)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            })
        })
};

// Find a single LendingRequest with an id
exports.findOne = (req, res) => {
    LendingRequest.findById(req.params.id)
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