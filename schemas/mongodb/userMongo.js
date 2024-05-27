import mongoose from "mongoose";
import z, { number } from 'zod'

 const userSchema = mongoose.Schema({    
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    position: {
        type:String,
        required:false,
    },
    level:{
        type:Number,
        required:false,
    },
    imgUrl:{
        type:String,
        required:false,
        default:'https://firebasestorage.googleapis.com/v0/b/imagenes-react-9d27e.appspot.com/o/admin?alt=media&token=162b00ed-4690-4d2f-8a5e-86830fee3d0c'
    }
})

export const User = mongoose.model('User',userSchema)

const userSchemaZod = z.object({
    username:z.string(),
    email:z.string(),
    password:z.string(),
    name:z.string(),
    firstName:z.string(),
    position:z.string(),
    league:z.string(),
    imgUrl:z.string()
})
export const validatePartialUser = (input)=> {
    return userSchemaZod.partial().safeParse(input)
}