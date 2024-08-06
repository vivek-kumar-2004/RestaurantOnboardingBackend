const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=(req,res,next)=>{
    console.log('Cookies:', req.cookies);
    try{
        const token = req.cookies.cookie;
        console.log('Token:', token);
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token not provided',
            })
        }

        const payload=jwt.verify(token,process.env.JWT_SECRET);
        req.user=payload;
        next();

    }catch(err){
            console.error(err);
            return res.status(401).json({
                success:false,
                message:'Token is not valid',
            })
        }
}

