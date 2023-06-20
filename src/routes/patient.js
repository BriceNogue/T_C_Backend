const express = require("express");
const patientModel = require("../models/patient");

const router = express.Router();

// create patient
router.post("/patient", (req, res) => {
    const inscriptionDate = Date.now();
    const pwd = "0000";
    const patient = patientModel(
        {
            patient_code: "PCODE"+req.body.first_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
            inscription_date: inscriptionDate,
            birthday: req.body.birthday,
            age: req.body.age,
            gender: req.body.gender,
            blood_group: req.body.blood_group,
            assurance: req.body.assurance,
            phone: req.body.phone,
            picture: req.body.picture,
            marital_status: req.body.marital_status,
            emergency_number: req.body.emergency_number,
            occupation: req.body.occupation,
            password: pwd,
        }
    );
    patient.save().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// get all patients
router.get("/patients", (req, res) => {
    patientModel.find().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// get patient by id
router.get("/patients/:id", (req, res) => {
    const { id } = req.params;
    patientModel.findById(id).then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// upadate patient
router.put("/patient/:id", (req, res) => {
    const { id } = req.params;
    const {
        patient_code,
        first_name,
        last_name,
        address,
        inscription_date,
        birthday,
        age,
        gender,
        blood_group,
        assurance,
        phone,
        picture,
        marital_status,
        emergency_number,
        occupation,
        password
    } = req.body;
    patientModel.updateOne({ _id: id }, {
        $set: {
            patient_code,
            first_name,
            last_name,
            address,
            inscription_date,
            birthday,
            age,
            gender,
            blood_group,
            assurance,
            phone,
            picture,
            marital_status,
            emergency_number,
            occupation,
            password
        }
    }).then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

// delete patient
router.delete("/patient/:id", (req, res) => {
    const { id } = req.params;
    patientModel.deleteOne({ _id: id }).then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

module.exports = router;