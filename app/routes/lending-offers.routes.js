module.exports = app => {
    const lendingOffer = require("../controllers/offers/lending.controller.js")
    const router = require("express").Router()

    // Create a new LendingOffer
    router.post("/", lendingOffer.create)

    // Retrieve all LendingOffer
    router.get("/", lendingOffer.findAll)

    // Retrieve a single LendingOffer with id
    router.get("/:id", lendingOffer.findOne)

    app.use("/lending-offers", router);
};