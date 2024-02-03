const router = require("express").Router()

const { GetAllBlogs ,AddBlogs,AddBLeads,GetAllLeads} = require('../Controllers/Blogs.controllers')
const { login} = require('../Controllers/login.controller')


router.post('/login', login);



router.post('/add/blog', AddBlogs);
router.get('/get/blog', GetAllBlogs);


router.post('/add/leads', AddBLeads);
router.get('/get/leads', GetAllLeads);





module.exports = router;


