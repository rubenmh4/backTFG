import {Router} from 'express'
import { UserController } from '../controllers/userController.js'
import { UserControllerMg } from '../controllers/userControllerMg.js'

export const userRouter = Router()

userRouter.get('/',UserController.getAll)
userRouter.post('/',UserController.create)

userRouter.get('/:id',UserController.getById)
userRouter.delete('/:id',UserController.delete)
userRouter.patch('/:id',UserController.update)



userRouter.post('/mongo',UserControllerMg.create)
userRouter.patch('/mongo/:id',UserControllerMg.updateUser)
userRouter.get('/mongo/get',UserControllerMg.getAll)
userRouter.get('/mongo/chat',UserControllerMg.getUserChat)
userRouter.get('/mongo/:id',UserControllerMg.getById)
userRouter.delete('/mongo/:id',UserControllerMg.deleteById)