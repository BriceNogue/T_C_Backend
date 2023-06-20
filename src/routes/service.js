const express = require("express");
const serviceModel = require("../models/service");

const router = express.Router();

// create service
/*router.post("/service", (req, res) => {
    const service = serviceModel(req.body);
    service.save().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});*/

router.post("/service", (req, res) => {
    const service = new serviceModel(
        {
            service_code: req.body.libelle + 237,
            libelle: req.body.libelle,
            description: req.body.description,
            hours: req.body.hours
        });
    service.save().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// get all services
router.get("/services", (req, res) => {
    serviceModel.find().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// get service by id
router.get("/services/:id", (req, res) => {
    const { id } = req.params;
    serviceModel.findById(id).then((data) =>
        res.json(data)).catch((error) => res.json({ message: error }));
});

// update service
router.put("/service/:id", (req, res) => {
    const { id } = req.params;
    const {
        service_code,
        libelle,
        description
    } = req.body;
    serviceModel.updateOne({ _id: id }, {
        $set: {
            service_code,
            libelle,
            description
        }
    }).then((data) => res.json(data)).catch((error) => res.json({ message: error }));
});

// delete service
router.delete("/service/:id", (req, res) => {
    const { id } = req.params;
    serviceModel.deleteOne({ _id: id }).then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// create hours
router.post("/service/:id", (req, res) => {
    const { id } = req.params;
    const {
        day,
        startTime,
        endTime
    } = req.body;
    serviceModel.updateOne({ _id: id }, {
        $push: {
            hours: {
                day,
                startTime,
                endTime
            }
        }
    }).then((data) => res.json(data)).catch((error) => res.json({ message: error }));

})

module.exports = router;