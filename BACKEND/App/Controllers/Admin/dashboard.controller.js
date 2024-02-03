"use strict";
const db = require('../../Models');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const ObjectId = mongoose.Types.ObjectId;
const User = db.user

class Dashboard {

    // ADMIN DASHBOARD
    async AdminDashboard(req, res) {
        try{

        } catch (error) {
            console.log("Get Admin Dashboard data -", error);
        }
    }


}


module.exports = new Dashboard();