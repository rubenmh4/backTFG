import express, { json } from 'express'
import logger from 'morgan'
import { userRouter } from './Router/userRouter.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
//driver de mongo
import mongoose from 'mongoose'
//variable de entorno customizadas
import { config } from 'dotenv'
import { bookingRouter } from './Router/bookingRouter.js'

config()
//conection mongodb
const url  = process.env.MONGO


mongoose.connect('mongodb+srv://rubenmh4:ruben2004@proyectodaw.cjqsoxa.mongodb.net/test',{})
.then(()=> {console.log('Connected to MongoDb Atlas')})
.catch(err => {console.log(err)})


const app = express()

app.use(cors())
app.use(json())
app.use(cookieParser())
app.use(logger('dev'))
app.disable('x-powered-by')


app.get('/', (req,res)=> {
    res.json({message:"EL PRIMER PASO DE MI API REST EN NODE"})
})

app.use('/users',userRouter)
app.use('/booking',bookingRouter)

const port = process.env.PORT ?? 3001

app.listen(port, ()=> {
    console.log(`Server running in http://localhost:${port}`)
})

