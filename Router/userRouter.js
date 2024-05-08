import {Router} from 'express'
import { UserController } from '../controllers/userController.js'
import { UserControllerMg } from '../controllers/userControllerMg.js'

export const userRouter = Router()

userRouter.get('/',UserController.getAll)
userRouter.post('/',UserController.create)

userRouter.get('/:id',UserController.getById)
userRouter.delete('/:id',UserController.delete)
userRouter.patch('/:id',UserController.update)


//registro
userRouter.post('/mongo',UserControllerMg.create)
//login
userRouter.post('/mongo/login',UserControllerMg.login)
//update User
userRouter.patch('/mongo/:id',UserControllerMg.updateUser)
//getAll User
userRouter.get('/mongo/get',UserControllerMg.getAll)
//get all user with chat
userRouter.get('/mongo/chat',UserControllerMg.getUserChat)
//get user by id
userRouter.get('/mongo/:id',UserControllerMg.getById)
//delete user by id
userRouter.delete('/mongo/:id',UserControllerMg.deleteById)