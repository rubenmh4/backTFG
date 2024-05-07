import mongoose from "mongoose";


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