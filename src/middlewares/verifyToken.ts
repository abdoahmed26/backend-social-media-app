import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    if(!req.headers.authorization){
        res.status(401).json({status:"fail",message: "unauthorized"})
    }
    else{
        const token = req.headers.authorization.split(" ")[1]
        if(token){
            jwt.verify(token, process.env.JWT_SECRET_KEY as string,(err,user)=>{
                if(err){
                    res.status(401).json({status:"fail",message: "expired token"})
                }
                else{
                    req.user = user;
                    next()
                }
            })
        }
        else{
            res.status(401).json({status:"fail",message: "unauthorized"})
        }
    }
}