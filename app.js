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

//socket
import http from 'http'
import {Server as SocketServer} from 'socket.io'
import { Message } from './schemas/mongodb/messageMongo.js'

config()
//conection mongodb
const url  = process.env.MONGO

mongoose.connect(url,{})
.then(()=> {console.log('Connected to MongoDb Atlas')})
.catch(err => {console.log(err)})


const app = express()

const server = http.createServer(app)
const io =  new SocketServer(server, {
    cors:{
        origin:'http://localhost:5173' ,
        origin:'https://rmpadelindoor.netlify.app'
    }
})


io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
  
    // Enviar todos los mensajes guardados al nuevo cliente
    Message.find().then(messages => {
      socket.emit('initialMessages', messages);
    });
  
    // Manejar mensajes entrantes
    socket.on('sendMessage', (data) => {
      const newMessage = new Message({
        user: data.user,
        message:data.message,
        time:data.time
      });
  
      newMessage.save().then(() => {
        io.emit('receiveMessage', newMessage);
      });
    });
  
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
  


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

server.listen(port, ()=> {
    console.log(`Server running in http://localhost:${port}`)
})

