import mongoose from "mongoose";


const bookingSchema = mongoose.Schema({

    pista:{
        type:Number,
        required:true
    },
    hora :{
        type:Number,
        required:true
    },
    diaReserva: {
        type:Date,
        require:true
    },
    idUsuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

export const Booking = mongoose.model('Booking',bookingSchema)