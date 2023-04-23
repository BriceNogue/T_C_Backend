const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// routes definition
const appointmentRoutes = require("./routes/appointment");
const consultationRoutes = require("./routes/consultation");
const patientRoutes = require("./routes/patient");
const paymentRoutes = require("./routes/payment");
const prescriptionRoutes = require("./routes/prescription");
const serviceRoutes = require("./routes/service");
const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT || 9000;
const cors = require('cors');

// middleware
app.use(cors({
    origin: '*', credentials: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS', allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json());

app.use('/api', consultationRoutes);
app.use('/api', patientRoutes);
app.use('/api', paymentRoutes);
app.use('/api', prescriptionRoutes);
app.use('/api', serviceRoutes);
app.use('/api', userRoutes);

// routes
app.get('/', (req, res) => {
    res.send("Welcome")
});

// mongodb connection
mongoose
    .connect("mongodb://127.0.0.1/TackCare")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('Server listening on port ', port));