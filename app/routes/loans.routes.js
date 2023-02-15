module.exports = app => {
    const loan = require("../controllers/loans.controller.js")
    const router = require("express").Router()

    // Create a new loan
    router.post("/", loan.create)

    // Retrieve all loans
    router.get("/", loan.findAll)

    // Retrieve a single loan with id
    router.get("/:id", loan.findOne)

    app.use("/loans", router);
};