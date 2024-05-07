import { Booking } from "../schemas/mongodb/bookingMongo";

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
        return res.status(404).json({ message: "USE NOT FOUND" });
      res.json(deletedBooking);
    } catch (err) {
      res.json(err);
    }
  };
}
