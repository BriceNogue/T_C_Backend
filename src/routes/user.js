const express = require("express");
const userModel = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// create user
router.post("/user", (req, res) => {
    const userCode = "TCUC" + req.body.phone
    const pwd = "0000"
    const user = userModel(
        {
            user_code: userCode,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
            service_id: req.body.service_id,
            phone: req.body.phone,
            picture: req.body.picture,
            password: pwd
        }
    );
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
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// update user
router.put("/user/:id", (req, res) => {
    const { id } = req.params;
    const {
        user_code,
        first_name,
        last_name,
        address,
        service_id,
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
            service_id,
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


// login route
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

router.get("/userSearch/:service", function (req, res) {
    const { service_id } = req.params;
    const options = {
        projection: {
            _id: 0,
            first_name: 1,
            service: 1
        }
    }
    console.log(service_id);
    userModel.findOne({ service_id: service_id }, options).then((res) =>
        res.json(res)).catch((error) =>
            res.json({ message: error }));

})

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

        const token = jwt.sign({ _id: user._id }, "secret");
        const { password, ...data } = await user.toJSON();

        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        res.send({
            message: "Connected",
            data,
            token
        });

    } catch (err) {
        console.log('error', err);
    }
});

/*router.get("/user", async (req, res) => {
    try {
        const cookie = req.cookies['jwt'];

        const claims = jwt.verify(cookie, 'secret');

        if (!claims) {
            return res.status(401).send({
                message: 'unauthorized'
            });
        }

        const user = await userModel.findOne({ _id: claims._id });
        const { password, ...data } = await user.toJSON();

        res.send(data);

    } catch (err) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }
})*/

router.post('/logout', (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 0
    });

    res.send({
        message: 'Desconnected',
    });
});

module.exports = router;