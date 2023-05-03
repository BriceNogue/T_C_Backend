const express = require("express");
const mongoose = require("mongoose");

const HoursModel = mongoose.Schema(
    {
        service_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Servives',
            require: true
        },
        date: {
            type: String,
            require: true
        },
        startTime: {
            type: String,
            require: true
        },
        endTime: {
            type: String,
            require: true
        }
    }
)

module.exports = mongoose.model('Hours', HoursModel);