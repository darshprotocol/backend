module.exports = app => {
    const borrowingOffer = require("../../controllers/offers/borrowing.controller.js")
    const router = require("express").Router()

    // Create a new LendingOffer
    router.post("/", borrowingOffer.create)

    // Retrieve all LendingOffer
    router.get("/", borrowingOffer.findAll)

    // Retrieve a single LendingOffer with id
    router.get("/:id", borrowingOffer.findOne)

    app.use("/borrowing-offers", router);
};