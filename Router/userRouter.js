import {Router} from 'express'
import { UserController } from '../controllers/userController.js'

export const userRouter = Router()

userRouter.get('/',UserController.getAll)
userRouter.post('/',UserController.create)

userRouter.get('/:id',UserController.getById)
userRouter.delete('/:id',UserController.delete)
userRouter.patch('/:id',UserController.update)