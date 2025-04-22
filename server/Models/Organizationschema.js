var mongoose=require("mongoose");

var OrganizationSchema=mongoose.Schema({
    organizationname: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    profilepic: {
        type:Object,
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
    mobile: {
        type:Number,
        required:true
    },
    password: {
        type:String,
        required:true
    },
});

const Organization=mongoose.model('organizations',OrganizationSchema);

module.exports = Organization;

