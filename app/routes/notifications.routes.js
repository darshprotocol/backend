module.exports = app => {
    const notification = require("../controllers/notifications.controller.js")
    const router = require("express").Router()

    // Create a new notification
    router.post("/", notification.create)

    // Retrieve all notifications
    router.get("/", notification.findAll)

    router.post("/mark/:id", notification.markAsRead)

    router.post("/markall", notification.markAllAsRead)

    app.use("/notifications", router);
};