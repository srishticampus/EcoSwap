var express=require("express");
var usercontroller=require("./Controllers/Usercontroller");
var admincontroller=require("./Controllers/Admincontroller");
var orgcontroller=require("./Controllers/Organizationcontroller");

var route=express.Router();

route.post('/reguser',usercontroller.uploadimg,usercontroller.saveuser);
route.post('/userlogin',usercontroller.loginvalidateuser);

route.post('/adminlogin',admincontroller.loginvalidateadmin);

route.post('/regorg',orgcontroller.uploadimg,orgcontroller.saveorg);
route.post('/orglogin',orgcontroller.loginvalidateorg);


module.exports=route;