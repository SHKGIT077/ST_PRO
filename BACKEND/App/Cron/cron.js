var cron = require('node-cron');
const axios = require('axios');
const fs = require('fs');

const { logger, getIPAddress } = require('../Helper/logger.helper')
var dateTime = require('node-datetime');
var moment = require('moment');
const db = require('../Models')
const User = db.user;
const user_logs = db.user_logs;




cron.schedule('5 2 * * *', () => {
    console.log('Run First Time');
    LogoutAllUsers()
});


cron.schedule('*/30 * * * *', () => {
    //console.log("okk")
    GetStrickPriceFromSheet();
});


// =========================================================================================================================

// 1. LOGOUT AND TRADING OFF ALL USER 
const LogoutAllUsers = async () => {

    // APP LOGOUT USERS  
    const AppLoginUser = await User.find({ AppLoginStatus: '1' });


    if (AppLoginUser.length > 0) {
        AppLoginUser.map(async (user) => {

            const updateValues = { AppLoginStatus: '0' };
            const updatedDocument = await User.findByIdAndUpdate(user._id, updateValues, {
                new: true, // To return the updated document
            });

            const user_login = new user_logs({
                user_Id: user._id,
                login_status: "Panel Off In App",
                role: user.Role,
                system_ip: getIPAddress()
            })
            await user_login.save();
        })
    }

    // WEB LOGOUT USERS  
    const WebLoginUser = await User.find({ WebLoginStatus: '1' });
    if (WebLoginUser.length > 0) {
        WebLoginUser.map(async (user) => {
            const updateValues = { WebLoginStatus: '0' };
            const updatedDocument = await User.findByIdAndUpdate(user._id, updateValues, {
                new: true, // To return the updated document
            });

            const user_login = new user_logs({
                user_Id: user._id,
                login_status: "Panel Off In Web",
                role: user.Role,
                system_ip: getIPAddress()
            })
            await user_login.save();
        })
    }


    // TRADING ON ANY USER 
    const TradingOffUser = await User.find({ TradingStatus: 'on' });
    if (TradingOffUser.length > 0) {
        TradingOffUser.map(async (user) => {
            const updateValues = { TradingStatus: 'off', access_token: "" };
            const updatedDocument = await User.findByIdAndUpdate(user._id, updateValues, {
                new: true, // To return the updated document
            });

            const user_login = new user_logs({
                user_Id: user._id,
                login_status: "Trading Off By System",
                role: user.Role,
                system_ip: getIPAddress()
            })
            await user_login.save();
        })
    }


    // ADMIN TRADING OFF
    const updateOperation1 = { $set: { trading_status: 'off', access_token: "" } };
    const result1 = await live_price.updateMany({}, updateOperation1);



}




module.exports = {  LogoutAllUsers  }
