module.exports = app => {
    const loan = require("../controllers/loans.controller.js")
    const router = require("express").Router()

    // Create a new loan
    router.post("/", loan.create)

    // Retrieve all loans
    router.get("/", loan.findAll)

    router.get("/vault", loan.findVault)

    app.use("/loans", router);
};