import jsonwebtoken from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export const onlyAdmin =(req,res,next) => {
    const cookie = req.header.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4)
    const verifyJwt = jsonwebtoken.verify(cookie,/*jwtsecret.env*/)
} 

export const onlyPublic = (req,res,next)=> {

}