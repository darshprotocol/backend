module.exports = app => {
    const request = require("../controllers/requests.controller.js")
    const router = require("express").Router()

    // Create a new request
    router.post("/", request.create)

    // Retrieve all requests
    router.get("/", request.findAll)

     // Retrieve a single request with id
     router.get("/:id", request.findOne)

    app.use("/requests", router);
};