"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const db = require('../Models');
const Blogs_Model = db.BlogsModel;
const Leads_Model = db.LeadsModel;




// Login CLASS
class Blogs {

    async GetAllBlogs(req, res) {
        try {
            var Blogs_data = await Blogs_Model.find()
            res.send({ status: true, data: Blogs_data, msg: "Data Get " })

        } catch (error) {
            console.log("Error -", error);
        }
    }



    async AddBlogs(req, res) {
        try {
            const { BlogName, Blog, BlogImg } = req.body


            var data = {
                "BlogName": BlogName,
                "Blog": Blog,
                "BlogImg": BlogImg
            }
            const Blogs_Data = new Blogs_Model(data)
            Blogs_Data.save();

            res.send({ status: true, msg: "Add Blogs" })

        } catch (error) {
            console.log("Error -", error);
        }
    }



    async AddBLeads(req, res) {
        try {
            const { Name, Email, PhoneNo, msg } = req.body


            var data = {
                "Name": Name,
                "Email": Email,
                "PhoneNo": PhoneNo,
                "msg": msg
            }
            const Blogs_Data = new Leads_Model(data)
            Blogs_Data.save();

            res.send({ status: true, msg: "Add Leads" })

        } catch (error) {
            console.log("Error -", error);
        }
    }

    async GetAllLeads(req, res) {
        try {
            var Leads_data = await Leads_Model.find()
            res.send({ status: true, data: Leads_data, msg: "Data Get " })

        } catch (error) {
            console.log("Error -", error);
        }
    }

}


module.exports = new Blogs();