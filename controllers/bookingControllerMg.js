import { Booking } from "../schemas/mongodb/bookingMongo.js";

export class BookingController {
  static create = async (req, res) => {
    const {hora,diaReserva,pista} = req.body
    
    const checkBokking =await  Booking.findOne({hora:hora,diaReserva:diaReserva,pista:pista})
    if(checkBokking !== null) return res.json({message:'RESERVA NO DISPONIBLE'})
    const newBooking = Booking(req.body);
    newBooking
      .save()
      .then((data) => (res.json(data)))
      .catch((err) => (res.json(err)));
  };

  static deleteById = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBooking = await Booking.deleteOne({ _id: id });
      if (!deletedBooking)
        return res.status(404).json({
          message: "BOOKING NOT FOUND",
          deleted: false,
        });
     return res.json({
        deletedBooking,
        message: "BOOKING DELETED",
        deleted: true,
      });
    } catch (err) {
     return res.json(err);
    }
  };



  static getBookingByUser = async(req,res) =>{
    try{
        const {id} = req.params
        const bookings = await Booking.find({idUsuario:id})

        if(bookings=== null) return res.json({message:'NOT FOUND BOOKING BY USER'})
        return res.json(bookings)  
    }
    catch(err){
      return  res.json(err)
    }
  }

  static getBookingByDate = async (req,res) =>{
    try{
      const {date } = req.params
      const bookings = await Booking.find({diaReserva:date})
      if(bookings === null) return res.json({message:'NOT FOUND BOOKING BY THIS DATE'})
      return res.json(bookings)
    } catch(err)      {
      return res.json(err)
    }
  }
}
