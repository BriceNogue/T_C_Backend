const express = require("express");
const hoursModel = require("../models/hours");

const router = express.Router();

router.post("/hour", (req, res) => {
    const hour = hoursModel(req.body);
    hour.save().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }))
})

router.get("/hours", (req, res) => {
    hoursModel.find().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
})

module.exports = router;