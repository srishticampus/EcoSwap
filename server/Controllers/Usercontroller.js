var User=require('../Models/Userschema');

const multer=require('multer');
const storage = multer.diskStorage({
    destination: function(req,res,cb){
        cb(null, "./upload");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    },
});
const uploadimg=multer({storage:storage}).single("profilePic");

const saveuser = async (req,res) =>{
    console.log(req.body)
    let profilePic=req.file

    const u = new User({
        fullName:req.body.fullName,
        gender:req.body.gender,
        profilePic:req.file,
        mobileNo:req.body.mobileNo,
        emailId:req.body.emailId,
        district:req.body.district,
        city:req.body.city,
        pincode:req.body.pincode,
        password:req.body.password,
        confirmPass:req.body.confirmPass,
    })

    const user1 = await u.save()

    .then((result)=>{
        res.status(200).json({
            message:"Registered successfully"
        })
    })
    .catch((error)=>{
        res.status(500).json({
            message:error
        })
    })
}

const loginvalidateuser=async(req,res)=>{
    console.log(req.body);
    const {emailId,password}=req.body;

    await User.findOne({emailId:emailId})
    .then((result)=>{
        console.log(result)
        if(!result){
            res.status(404).json({
                message:"User not found"
            })
        }else if(result.emailId!=emailId){
            res.status(500).json({
                message:"Wrong username or email"
            })
        }else if(result.password!=password){
            res.status(500).json({
                message:"Wrong password"
            })
        }else{
            res.status(200).json({
                message:"Login successful",
                data:result
            })
        }
    })
    .catch((error)=>{
        message:error
    })

}



module.exports={saveuser,uploadimg,loginvalidateuser}