var express = require("express");
var userController = require("./Controllers/Usercontroller");
var admincontroller = require("./Controllers/Admincontroller");
var orgcontroller = require("./Controllers/Organizationcontroller");

var route = express.Router();

route.post('/user/register', userController.uploadimg, userController.saveuser);
route.post('/user/login', userController.loginvalidateuser);
route.get('/viewuser/:id', userController.viewOneUser);
route.get('/viewallusers', userController.viewAllUsers);
route.put('/updateuser/:id', userController.uploadimg, userController.updateUser);
route.post('/user/forgotpassword', userController.forgotPassword);

route.post('/organization/register', orgcontroller.uploadimg, orgcontroller.saveorg);
route.post('/organization/login', orgcontroller.loginvalidateorg);
route.get('/vieworganization/:id', orgcontroller.viewOneOrganization);
route.get('/viewallorganization', orgcontroller.viewAllOrganizations);
route.put('/updateorganization/:id', orgcontroller.updateOrganizationDetails);
route.post('/organization/forgotpassword', orgcontroller.forgotPassword);



module.exports = route;