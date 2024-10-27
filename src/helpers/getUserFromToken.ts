import jwt from "jsonwebtoken";

export const getUserFromToken = async(token:string):Promise<any> => {
    try{
        const user = jwt.verify(token,process.env.JWT_SECRET_KEY as string)
        return user
    }catch(err:any){
        console.log(err.message);
    }
}