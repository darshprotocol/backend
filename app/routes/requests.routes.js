module.exports = app => {
    const request = require("../controllers/requests.controller.js")
    const router = require("express").Router()

    // Create a new request
    router.post("/", request.create)

    // Retrieve all requests
    router.get("/", request.findAll)

    app.use("/requests", router);
};