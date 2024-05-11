import {Router} from 'express'
import { UserController } from '../controllers/userController.js'
import { UserControllerMg } from '../controllers/userControllerMg.js'

export const userRouter = Router()

userRouter.post('/register',UserControllerMg.create)
userRouter.post('/login',UserControllerMg.login)


userRouter.get('/chat',UserControllerMg.getUserChat)
userRouter.get('/',UserControllerMg.getAll)
userRouter.get('/:id',UserControllerMg.getById)

userRouter.delete('/:id',UserControllerMg.deleteById)

userRouter.patch('/:id',UserControllerMg.updateUser)
