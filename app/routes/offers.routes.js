module.exports = app => {
    const offer = require("../controllers/offers.controller.js")
    const router = require("express").Router()

    // Create a new offer
    router.post("/", offer.create)

    // Retrieve all offers
    router.get("/", offer.findAll)

    // Retrieve a single offer with id
    router.get("/:id", offer.findOne)

    app.use("/offers", router);
};