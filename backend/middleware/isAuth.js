import jwt from "jsonwebtoken"
const isAuth =async (req,res,next) =>{
   try {
     let {token } =req.cookies
     console.log('isAuth middleware called, token present:', !!token)
    if(!token){
        console.log('No token found in cookies')
        return res.status(400).json({message :"user does not have token"})
    }
    let verifyToken =await jwt.verify(token,process.env.JWT_SECRET)
    console.log('Token verification result:', !!verifyToken)
     if(!verifyToken){
        console.log('Token verification failed')
        return res.status(400).json({message :"user does not have valid token"})
    }
    req.userId = verifyToken.userId
    console.log('User authenticated with userId:', req.userId)
    next()
   } catch (error) {
    console.log('isAuth error:', error)
    return res.status(500).json({message:`isAuth error ${error}`})
   }
}
export default isAuth