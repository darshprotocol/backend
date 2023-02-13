module.exports = app => {
    const lendingRequest = require("../../controllers/requests/lending.controller.js")
    const router = require("express").Router()

    // Create a new LendingRequest
    router.post("/", lendingRequest.create)

    // Retrieve all LendingRequest
    router.get("/", lendingRequest.findAll)

    // Retrieve aall LendingRequest with address
    router.get("/:address", lendingRequest.findOne)

    app.use("/lending-requests", router);
};