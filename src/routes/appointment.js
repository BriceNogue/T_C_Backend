const express = require("express");
const appointmentModel = require("../models/appointment");

const router = express.Router();

// create appointment
router.post("/appointment", (req, res) => {
    const appointmentDate = Date.now();
    const appointment = appointmentModel(
        {
            appointment_date: appointmentDate,
            appointment_code: req.body.service_libelle+appointmentDate+req.body.date_of_appointment,
            date_of_appointment: req.body.date_of_appointment,
            appointment_hour: req.body.appointment_hour,
            patient_code: req.body.patient_code,
            patient_name: req.body.patient_name,
            patient_phone: req.body.patient_phone,
            service_libelle: req.body.service_libelle,
            user_code: req.body.user_code,
            user_name: req.body.user_name
        }
    );

    appointment.save().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// get all appointment
router.get("/appointments", (req, res) => {
    appointmentModel.find().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// get appointment by id
router.get("/appointments/:id", (req, res) => {
    const { id } = req.params;
    appointmentModel.findById(id).then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// update appointment
router.put("/appointments/:id", (req, res) => {
    const { id } = req.params;
    const {
        appointment_code,
        appointment_date,
        date_of_appointment,
        appointment_hour,
        patient_code,
        patient_name,
        patient_phone,
        service_libelle,
        user_code,
        user_name
    } = req.body;
    appointmentModel.updateOne({ _id: id }, {
        $set: {
            date_of_appointment,
            appointment_hour,
            patient_code,
            patient_name,
            patient_phone,
            service_libelle,
            user_code,
            user_name
        }
    }).then((data) => res.json(data)).catch((error) => res.json({ message: error }));
});

// delete appointment
router.delete("/appointment/:id", (req, res) => {
    const { id } = req.params;
    appointmentModel.deleteOne({ _id: id }).then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
})

module.exports = router;