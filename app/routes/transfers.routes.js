module.exports = app => {
    const transfer = require("../controllers/transfers.controller.js")
    const router = require("express").Router()

    // Create a new transfer
    router.post("/", transfer.create)

    // Retrieve all transfers
    router.get("/", transfer.findAll)

    app.use("/transfer", router);
};