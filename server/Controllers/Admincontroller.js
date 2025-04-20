var Admin=require('../Models/Adminschema');


const loginvalidateadmin=async(req,res)=>{
    console.log(req.body);
    const {emailId,password}=req.body;

    const adminEmail = "admin123@gmail.com";
    const adminPass = "admin123";

        if(emailId == adminEmail && password == adminPass){
            return res.status(200).json({
                message:"Admin login successful",
                data:{
                    emailId : adminEmail
                }
            })
        }else{
            return res.status(404).json({
                message:"Invalid admin"
            })
        }
    
}



module.exports={loginvalidateadmin}