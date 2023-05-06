const express = require("express");
const paymentModel = require("../models/payment");

const router = express.Router();

// create payment
router.post("/payment", (req, res) => {

    const paymentDate = Date.now();
    const paymentCard = paymentModel(
        {
            payment_code: "TKPC" + req.body.user_id,
            payment_date: paymentDate,
            patient_card_id: req.body.payment_card_id,
            amount_to_be_paid: req.body.amount_to_be_paid,
            amount_paid: req.body.amount_paid,
            status: req.body.status,
            user_id: req.body.user_id
        }
    );
    paymentCard.save().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// get all cards
router.get("/payments", (req, res) => {
    paymentModel.find().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// get card by id
router.get("/payments/:id", (req, res) => {
    const { id } = req.params;
    paymentModel.findById({ _id: id }).then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// update card
router.put("/payments/:id", (req, res) => {
    const { id } = req.params;
    const {
        payment_code,
        payment_date,
        patient_card_id,
        amount_to_be_paid,
        amount_paid,
        status,
        user_id
    } = req.body;
    patientCardModel.updateOne({ _id: id }, {
        $set: {
            payment_code,
            payment_date,
            patient_card_id,
            amount_to_be_paid,
            amount_paid,
            status,
            user_id
        }
    }).then((data) => res.json(data)).catch((error) => res.json({ message: error }));
})

// delete payemnt
router.delete("/payment/:id", (req, res) => {
    const { id } = req.params;
    paymentModel.deleteOne({ _id: id }).then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});


module.exports = router;