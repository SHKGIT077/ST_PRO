"use strict";
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const db = require("../../Models");
const User = db.user;

class Users {

  // USER ADD
  async AddUser(req, res) {
    try{

    } catch (error) {
      res.send({ msg: "Error=>", error });
    }
  }

  // UPDATE USER
  async UpdateUser(req, res) {
    try{

    } catch (error) {
      console.log("Error In User Update-", error);
    }
  }


  // GET ALL GetAllClients
  async GetAllClients(req, res) {
   try{

   }catch (error) {
      console.log("Error loginClients Error-", error);
      return res.send({
        status: false,
        msg: "Empty data",
        data: [],
        // totalCount: totalCount,
      });
    }
  }


  // DELETE USER AND USER REGARD SERVICES
  async DeleteUser(req, res) {
    try {
      const { id } = req.body;
      // UPDATE ACTTIVE STATUS CLIENT

      const get_user = await User_model.find({ _id: id });
      if (get_user.length == 0) {
        return res.send({ status: false, msg: "Empty data", data: [] });
      }

    

      var DeleteUser = await User_model.deleteOne({ _id: get_user[0]._id });

      
      res.send({
        status: true,
        msg: "Delete Successfully",
        data: DeleteUser,
      });
    } catch (error) {
      console.log("Error trading status Error-", error);
    }
  }



}

module.exports = new Users();



