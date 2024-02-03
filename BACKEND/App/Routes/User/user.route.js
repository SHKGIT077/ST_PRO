
"use strict"

const router = require("express").Router()
const { verifyToken } = require('../../Middleware/authjwt')

const { getusertradingStatus, getuserUpdateStatus } = require('../../Controllers/User/Trading_status')
const { AddHelp } = require('../../Controllers/User/HelpCenter')


// TRADING STATUS
router.post('/getall/user/trading_status',verifyToken, getusertradingStatus);
router.post('/getall/user/update_somthing_status', getuserUpdateStatus);

// Help Center
router.post('/create/user/help', AddHelp);



module.exports = router;


