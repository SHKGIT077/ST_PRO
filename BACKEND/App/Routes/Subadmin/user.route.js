
"use strict"

const router = require("express").Router()
const { verifyToken } = require('../../Middleware/authjwt')

const { AddEmployee} = require('../../Controllers/Subadmin/user.controller')


// USER ADD EDIT
router.post('/sub/add/employee',  AddEmployee);



module.exports = router;


