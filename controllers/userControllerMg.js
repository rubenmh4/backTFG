import { User, validatePartialUser } from "../schemas/mongodb/userMongo.js";
import bcryptjs from "bcryptjs";
import  jsonwebtoken  from "jsonwebtoken";
import {config} from 'dotenv'

config()

export class UserControllerMg {
  static create = async (req, res) => {
    const compareUser = await User.findOne({ username: req.body.username });

    if (compareUser === null) {
      const salt = await bcryptjs.genSalt(3);
      const hashPassword = await bcryptjs.hash(req.body.password, salt);

      const newUser = User({ ...req.body, password: hashPassword });
      newUser
        .save()
        .then((data) =>
          res.json({
            user: data,
            create: true,
          })
        )
        .catch((error) => res.json(error));
    } else {
      return res.json({
        message: "USER ALREADY EXIST",
        create: false,
      });
    }
  };

  static getAll = async (req, res) => {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      return res.json(err);
    }
  };

  static getById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (user === null)
        return res.status(404).json({ message: "NOT FOUND THE USER" });
      return res.json(user);
    } catch (err) {
      return res.json(err);
    }
  };

  static deleteById = async (req, res) => {
    try {
      const { id } = req.params;
      const userDeleted = await User.deleteOne({ _id: id });
      console.log(id);
      if (!userDeleted)
        return res.status(404).json({
          message: "USE NOT FOUND",
          deleted: false,
        });
      return res.json({
        userDeleted,
        message: "USER DELETED",
        deleted: true,
      });
    } catch (err) {
      return res.json(err);
    }
  };

  static getUserChat = async (req, res) => {
    try {
      const usersChat = await User.find({ isChat: true });
      if (usersChat === null)
        return res.status(404).json({ message: "NOT HAVE USERS" });
      return res.json(usersChat);
    } catch (err) {
      return res.json(err);
    }
  };

  static updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const results = validatePartialUser(req.body);
      if(results.data.password) {
        const salt = await bcryptjs.genSalt(3);
      const hashPassword = await bcryptjs.hash(results.data.password, salt);
      
      results.data.password = hashPassword
      }
      if(!results.success) return res.status(400).json({message:JSON.parse(results.error.message)})
      const updatedUser = await User.updateOne(
        { _id: id },
        { ...results.data }
      );
      return res.json(updatedUser);
    } catch (err) {
      return res.json(err);
    }
  };

  static login = async (req,res)=>{
    const {username,password} = req.body
    const usuarioACompare = await User.findOne({username:username})

    if(!usuarioACompare) return res.status(404).json({
      message:'Usuario o contraseña incorrecta'
    })
    //esto ya devuelve true
    const login = await bcryptjs.compare(password,usuarioACompare.password)
    //token, le vamos a dar un token q es una key para que pueda autorizarse
    if(!login) return res.status(400).json({message:'Usuario o contraseña incorrecta'})

      //firmamos
      const token = jsonwebtoken.sign(
        {user:usuarioACompare.username},
        process.env.JWT_SECRET,
      {expiresIn:process.env.JWT_EXPIRE})

      const cookieOptions = {
        expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24),
        path:"/"
      }
    
      res.cookie("jwt",token,cookieOptions)
      return res.json({message:'Usuario logueado'})

  }
}
