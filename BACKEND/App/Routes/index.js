
module.exports = function (app) {
    // Auth Route
    app.use(require("./Auth/login.route"));
 

    // SuperAdmin Route
    app.use(require("./SuperAdmin/theme_list.route"));
    app.use(require("./SuperAdmin/panel.route"));
    app.use(require("./SuperAdmin/Permission.route"));
    app.use(require("./SuperAdmin/SuperAdmin"));



    // Admin Route
    app.use(require("./Admin/user.route"));
    app.use(require("./Admin/dashboard.route"));


    // SUBADMIN ROUTES
    app.use(require("./Subadmin/subadmin.route"));
    app.use(require("./Subadmin/user.route"));

    // USER ROUTES
    app.use(require("./User/user.route"));

  


  

    
 

};