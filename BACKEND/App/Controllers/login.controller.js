"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const db = require('../Models');
const User = db.UsersModel;



// Login CLASS
class Login {



    // Login User
    async login(req, res) {
        try {
            const { Email, Password } = req.body;
            // IF Login Time Email CHECK

            const EmailCheck = await User.findOne({ Email: Email });
            if (!EmailCheck) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            }

            // PASSWORD LENGTH CHECK
            if (Password.length < 4) {
                return res.send({ status: false, msg: 'please Enter More Than 4 Digits ', data: [] });
            }


            if (Password != EmailCheck.password ) {
                return res.send({ status: false, msg: 'please Enter Correct Password ', data: [] });
            }

            // Password Check
            // const validPassword = await bcrypt.compare(Password, EmailCheck.Password);
            // if (validPassword == false) {
            //     return res.send({ status: false, msg: 'Password Not Match', data: [] });
            // }


            // JWT TOKEN CREATE
            var token = jwt.sign({ id: EmailCheck._id }, process.env.SECRET, {
                expiresIn: 36000 // 10 hours
            });


            var msg = {
                'Email': EmailCheck.Email,
                'user_id': EmailCheck._id,
                'token': token,
                'mobile': EmailCheck.PhoneNo


            };


            try {
                res.send({ status: true, msg: "Login Succesfully", data: msg })
            } catch (error) {
                console.log("Error Some Error in a login", error);
            }
        }
        catch (error) {

            res.send({ status: false, msg: "Server Side error", data: error })
        }

    }

    // Verify user
    // async verifyUser(req, res) {
    //     try {
    //         const { Email, Otp, Device } = req.body;
    //         var addData = {}

    //         // IF Login Time Email CHECK
    //         const EmailCheck = await User.findOne({ Email: Email });
    //         if (!EmailCheck) {
    //             return res.send({ status: false, msg: 'User Not exists', data: [] });
    //         }

    //         // CHECK OTP AND VERFIY OUR CLIENTS
    //         if (EmailCheck.PhoneNo.slice(-4) != Otp) {
    //             return res.send({ status: false, msg: 'Otp Not Match', data: [] });
    //         }

    //         try {
    //             if (EmailCheck.Role == "USER" || EmailCheck.Role == "SUBADMIN") {

    //                 // WHERE LOGIN CHECK
    //                 if (Device.toUpperCase() == "APP") {                  //App Login Check
    //                     if (EmailCheck.AppLoginStatus == 1) {
    //                         logger.info('You are already logged in on the phone.', { role: EmailCheck.Role, user_id: EmailCheck._id });
    //                         return res.send({ status: false, msg: 'You are already logged in on the phone.', data: [] });
    //                     } else {
    //                         addData["AppLoginStatus"] = 1;
    //                     }
    //                 } else if (Device.toUpperCase() == "WEB") {          //Web login check
    //                     if (EmailCheck.WebLoginStatus == 1) {
    //                         logger.info('You are already logged in on the Web.', { role: EmailCheck.Role, user_id: EmailCheck._id });
    //                         return res.send({ status: false, msg: 'You are already logged in on the Web.', data: [] });
    //                     } else {
    //                         addData["WebLoginStatus"] = 1;
    //                     }
    //                 }
    //             } else {


    //                 // WHERE LOGIN CHECK
    //                 if (Device.toUpperCase() == "APP") {                  //App Login Check

    //                     addData["AppLoginStatus"] = 1;

    //                 } else if (Device.toUpperCase() == "WEB") {          //Web login check

    //                     addData["WebLoginStatus"] = 1;

    //                 }

    //             }


    //         } catch (error) {
    //             return res.send({ status: false, msg: 'Server Issue', data: error });

    //         }


    //         if (EmailCheck.Is_First_login == "0") {
    //             var disclaimerData = await disclaimer();

    //             var toEmail = EmailCheck.Email;
    //             var subjectEmail = "disclaimer";
    //             CommonEmail(toEmail, subjectEmail, disclaimerData);
    //         }



    //         addData["Is_First_login"] = 1;
    //         // Update Successfully
    //         const result = await User.updateOne(
    //             { Email: Email },
    //             { $set: addData }
    //         );

    //         // If Not Update User
    //         if (!result) {
    //             return res.send({ status: false, msg: 'Server Side issue.', data: [] });
    //         }

    //         // ADD USER LOGS COLLECTION DATA
    //         const user_login = new user_logs({
    //             user_Id: EmailCheck._id,
    //             login_status: "Panel On",
    //             role: EmailCheck.Role,
    //             device: Device,

    //             system_ip: getIPAddress()
    //         })
    //         await user_login.save();

    //         logger.info('Very Succesfully', { role: EmailCheck.Role, user_id: EmailCheck._id });
    //         res.send({ status: true, msg: "Login Successfully", data: [], firstlogin: EmailCheck.Is_First_login })


    //     } catch (error) {

    //     }
    // }


    // // Logout User
    // async logoutUser(req, res) {
    //     try {
    //         const { userId, Device } = req.body;
    //         var addData = {}

    //         // IF Login Time Email CHECK
    //         const EmailCheck = await User.findById(userId);
    //         if (!EmailCheck) {
    //             return res.send({ status: false, msg: 'User Not exists', data: [] });
    //         }


    //         try {
    //             // WHERE LOGIN CHECK
    //             if (Device.toUpperCase() == "APP") {                  //App Login Check
    //                 if (EmailCheck.AppLoginStatus == 0) {
    //                     logger.info('You are already log Out on the phone.', { role: EmailCheck.Role, user_id: EmailCheck._id });
    //                 } else {
    //                     addData["AppLoginStatus"] = 0;
    //                 }
    //             } else if (Device.toUpperCase() == "WEB") {          //Web login check
    //                 if (EmailCheck.WebLoginStatus == 0) {
    //                     logger.info('You are already log Out on the Web.', { role: EmailCheck.Role, user_id: EmailCheck._id });
    //                     // return res.send({ status: false, msg: 'You are already log Out on the Web.', data: [] });
    //                 } else {
    //                     addData["WebLoginStatus"] = 0;
    //                 }
    //             }

    //         } catch (error) {
    //             console.log("Error Verfiy error", error);
    //         }


    //         // Update Successfully
    //         const result = await User.updateOne(
    //             { Email: EmailCheck.Email },
    //             { $set: addData }
    //         );

    //         const user_login = new user_logs({
    //             user_Id: EmailCheck._id,
    //             login_status: "Panel off",
    //             role: EmailCheck.Role,
    //             system_ip: getIPAddress()
    //         })
    //         await user_login.save();

    //         // If Not Update User
    //         if (!result) {
    //             return res.send({ status: false, msg: 'Server Side issue.', data: [] });
    //         }


    //         logger.info('Logout Succesfully', { role: EmailCheck.Role, user_id: EmailCheck._id });
    //         res.send({ status: true, msg: "Logout Succesfully", data: [] })


    //     } catch (error) {

    //     }
    // }





}


module.exports = new Login();