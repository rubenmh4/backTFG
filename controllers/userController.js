import { UserModel } from "../models/userModel.js"
import { validatePartialUser, validateUser } from "../schemas/user.js"


export class UserController {

    static getAll =async (req,res)=> {
           const users = await UserModel.getAll()

           return res.json(users)
    }


    static create = async(req,res) => {
        const results = validateUser(req.body)
        if(!results.success){
            return res.status(400).json({message:JSON.parse(results.error.message)})
        }        
        const newUser = await UserModel.create({input:results.data})
        return res.status(201).json(newUser)
    }
    static getById= async (req,res) => {
        const {id} = req.params
        const user = await UserModel.getById({id})
        if(user) return res.json(user)
        return res.status(404).json({message:'USER NOT FOUND'})
    }

    static delete = async (req,res) => {
        const {id} = req.params
        const result = await UserModel.delete({id})

        if(result == false) return res.status(404).json({message:'USER NOT FOUND'})
        
            return res.json({message:'USER DELETED'})
    }

    static update = async(req,res) => {
        const result = validatePartialUser(req.body)
        
        if(!result.success) return res.status(400).json({message:JSON.parse(result.error.message)})
            
        const {id} = req.params
        const updateUser = await UserModel.update({id,input:result.data})
        return res.json(updateUser)
        
    }
    
}