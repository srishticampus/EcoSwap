var Organization=require('../Models/Organizationschema');

const multer=require('multer');
const storage = multer.diskStorage({
    destination: function(req,res,cb){
        cb(null, "./upload");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    },
});
const uploadimg=multer({storage:storage}).single("photo");

const saveorg = async (req,res) =>{
    console.log(req.body)
    let profilePic=req.file

    const org = new Organization({
        fullName:req.body.fullName,
        emailId:req.body.emailId,
        photo:req.file,
        address:req.body.address,
        phoneNo:req.body.phoneNo,
        password:req.body.password,
        confirmPass:req.body.confirmPass,
    })

    const organization1 = await org.save()

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

const loginvalidateorg=async(req,res)=>{
    console.log(req.body);
    const {emailId,password}=req.body;

    await Organization.findOne({emailId:emailId})
    .then((result)=>{
        console.log(result)
        if(!result){
            res.status(404).json({
                message:"Organization not found"
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



module.exports={saveorg,uploadimg,loginvalidateorg}