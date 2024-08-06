const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.Auth=(req,res,next)=>{
    try{
        const token = req.body.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token not provided',
            })
        }

        try{
            const payload=jwt.verify(token,process.env.jwt_secret);

            req.user=payload;

        }catch(err){
            console.error(err);
            return res.status(401).json({
                success:false,
                message:'Token is not valid',
            })
        }
        next();
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:'Server error',
        })
    }
}

