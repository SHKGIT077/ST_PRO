
"use strict"

const router = require("express").Router()
const { verifyToken } = require('../../Middleware/authjwt')
const { upload } = require('../../Helper/imgUpload');

const { AddUser, UpdateUser, GetAllClients } = require('../../Controllers/Admin/user.controller')

// USER ADD EDIT
router.post('/add/employee', verifyToken, AddUser);
router.post('/update/employee', verifyToken, UpdateUser);
// router.post('/update/employee', verifyToken, UpdateUser);

router.post('/getall/clients', GetAllClients);


module.exports = router;


