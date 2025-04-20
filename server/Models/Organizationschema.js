var mongoose=require("mongoose");

var OrganizationSchema=mongoose.Schema({
    fullName: {
        type:String,
        required:true
    },
    emailId: {
        type:String,
        required:true
    },
    photo: {
        type:Object,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    phoneNo: {
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

const Organization=mongoose.model('organizations',OrganizationSchema);

module.exports = Organization;

