import express, { json } from 'express'
import logger from 'morgan'
import { userRouter } from './Router/userRouter.js'

const port = process.env.PORT ?? 3001


const app = express()

app.use(json())
app.use(logger('dev'))
app.disable('x-powered-by')


app.get('/', (req,res)=> {
    res.json({message:"EL PRIMER PASO DE MI API REST EN NODE"})
})

app.use('/users',userRouter)

app.listen(port, ()=> {
    console.log(`Server running in http://localhost:${port}`)
})

