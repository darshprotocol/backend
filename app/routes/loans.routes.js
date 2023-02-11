module.exports = app => {
    const loan = require("../controllers/loan.controller.js")
    const router = require("express").Router()

    // Create a new LendingOffer
    router.post("/", loan.create)

    // Retrieve all LendingOffer
    router.get("/", loan.findAll)

    // Retrieve a single LendingOffer with id
    router.get("/:id", loan.findOne)

    app.use("/loans", router);
};