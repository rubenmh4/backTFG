import { Booking } from "../schemas/mongodb/bookingMongo.js";

export class BookingController {
  static create = async (req, res) => {
    const newBooking = Booking(req.body);
    newBooking
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
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
      res.json({
        deletedBooking,
        message: "BOOKING DELETED",
        deleted: true,
      });
    } catch (err) {
      res.json(err);
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
        res.json(err)
    }
  }
}
