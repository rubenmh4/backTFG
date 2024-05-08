import mongoose from "mongoose";
import z from 'zod'

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
        default:'--'
    },
    league:{
        type:String,
        required:false,
        default:'--'
    },
    isChat:{
        type:Boolean,
        required:false,
        default:false
    },
    imgUrl:{
        type:String,
        required:false,
        default:'https://unavatar.io/'
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
    isChat:z.boolean(),
    imgUrl:z.string()
})
export const validatePartialUser = (input)=> {
    return userSchemaZod.partial().safeParse(input)
}