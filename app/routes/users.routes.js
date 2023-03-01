module.exports = app => {
    const user = require("../controllers/users.controller.js")
    const router = require("express").Router()

    // Create a new user
    router.post("/", user.create)

    // Retrieve all users
    router.get("/", user.findAll)

    app.use("/users", router);
};