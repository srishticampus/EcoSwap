var mongoose=require("mongoose");

var UserSchema=mongoose.Schema({
    fullname: {
        type:String,
        required:true
    },
    gender: {
        type:String,
        enum:['Male','Female','Other'],
        required:true
    },
    profilepic: {
        type:Object,
        required:true
    },
    mobile: {
        type:Number,
        required:true
    },
    email: {
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
    isactive:{
        type:Boolean,
        required:true
    }
   
});

const User=mongoose.model('users',UserSchema);

module.exports = User;

