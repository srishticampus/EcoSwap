var mongoose=require("mongoose");

var UserSchema=mongoose.Schema({
    fullName: {
        type:String,
        required:true
    },
    gender: {
        type:String,
        enum:['Male','Female','Other'],
        required:true
    },
    profilePic: {
        type:Object,
        required:true
    },
    mobileNo: {
        type:Number,
        required:true
    },
    emailId: {
        type:String,
        required:true
    },
    district: {
        type:String,
        required:true
    },
    city: {
        type:String,
        required:true
    },
    pincode: {
        type:Number,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    confirmPass: {
        type:String,
        required:true
    }
});

const User=mongoose.model('users',UserSchema);

module.exports = User;

