module.exports = app => {
    const borrowingRequest = require("../../controllers/requests/borrowing.controller.js")
    const router = require("express").Router()

    // Create a new BorrowingRequest
    router.post("/", borrowingRequest.create)

    // Retrieve all BorrowingRequest
    router.get("/", borrowingRequest.findAll)

    // Retrieve aall BorrowingRequest with address
    router.get("/:address", borrowingRequest.findOne)

    app.use("/lending-requests", router);
};