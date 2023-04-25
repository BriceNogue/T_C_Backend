const express = require("express");
const userModel = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// create user
router.post("/user", (req, res) => {
    const user = userModel(req.body);
    user.save().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});
/*router.post("/user", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new userModel({
            user_code: req.body.user_code,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
            service: req.body.service,
            phone: req.body.phone,
            picture: req.body.picture,
            password: hashedPassword,
        });

        res.send(await user.save());
    } catch (err) {
        console.log(err);
    }
})*/

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

//get login route
/*router.post("/login", function (req, res) {
    try {
        userModel.findOne({ user_code: req.body.user_code }).select("user_code and password").exec(
            function (err, user) {
                if (err) throw err;
                if (!user) {
                    res.json({ success: false, message: "Could not authenticate user" });
                } else if (user) {
                    if (req.body.password) var validPassword = user.comparePassword(req.body.password);
                    if (!validPassword) {
                        res.json({ success: false, message: "Could not authenticate password" });
                    } else {
                        res.json({ succes: true, message: "User authenticated!" });
                    }
                }
            }
        );
    } catch (err) {
        console.log(err);
    }
});*/

router.post("/login", async (req, res) => {

    try {

        const user = await userModel.findOne({ user_code: req.body.user_code });

        if (!user) {
            return res.status(404).send({
                message: 'User not found'
            })
        }

        if (!await bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({
                message: 'Invalid credentials'
            })
        }

        const token  = jwt.sign({_id: user._id}, "secret");

        res.cookie('jwt', token, {
            httpOnly: true,
        })
        
        res.send(token);
    } catch (err) {
        console.log('error', err);
    }
})

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