import { User } from "../schemas/mongodb/userMongo.js"

export class UserControllerMg {
    static create = async (req,res)=> {
        const newUser =  User(req.body)
        newUser.save()
        .then((data)=> res.json(data))
        .catch((error)=> res.json(error))
    }

    static getAll = async(req,res) => {
        try {
            const users = await User.find()
            res.json(users)
        }catch(err){
            res.json(err)
        }

    }

    static getById = async (req,res) => {
        try{
            const {id} = req.params
            const user = await User.findById(id)
            if(user === null) return res.status(404).json({message:'NOT FOUND THE USER'})
            res.json(user)
        }catch(err){
            res.json(err)
        }
    }

    static deleteById = async (req,res) => {
        try {
            const {id} = req.params 
            const userDeleted = await User.deleteOne({_id:id})
            console.log(id)
            if(!userDeleted) return res.status(404).json({message:'USE NOT FOUND'})
            res.json(userDeleted)
        }
        catch(err){
            res.json(err)
        }
    }

    static getUserChat = async (req,res) => {
        try {
            const usersChat = await User.find({isChat:true}) 
            if(usersChat === null) return res.status(404).json({message:'NOT HAVE USERS'})
            res.json(usersChat)
        }catch(err){
            res.json(err)
        }

    }

}