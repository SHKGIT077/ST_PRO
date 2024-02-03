"use strict";
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const db = require("../../Models");
const User = db.user;

// Product CLASS
class Employee {

  // USER ADD
  async AddEmployee(req, res) {
    try{

    } catch (error) {
      res.send({ msg: "Error=>", error });
    }
  }


}

module.exports = new Employee();
