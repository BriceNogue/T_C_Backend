const express = require("express");
const userModel = require("../models/user");

const router = express.Router();

// create user
router.post("/user", (req, res) => {
    const user = userModel(req.body);
    user.save().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// get all users
router.get("/users", (req, res) => {
    userModel.find().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

//get user by id
router.get("/users/:id", (req, res) => {
    const { id } = req.params;
    userModel.findById(id).then((data) =>
        res.json(data)).catch((error) => res.json({ message: error }));
});

// update user
router.put("/user/:id", (req, res) => {
    const { id } = req.params;
    const {
        user_code,
        first_name,
        last_name,
        address,
        service,
        phone,
        picture,
        password
    } = req.body;
    userModel.updateOne({ _id: id }, {
        $set: {
            user_code,
            first_name,
            last_name,
            address,
            service,
            phone,
            picture,
            password
        }
    }).then((data) => res.json(data)).catch((error) => res.json({ message: error }));
});

// delete user 
router.delete("/user/:id", (req, res) => {
    const { id } = req.params;
    userModel.deleteOne({ _id: id }).then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

module.exports = router;