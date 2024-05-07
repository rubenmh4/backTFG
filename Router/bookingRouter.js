import { Router } from "express";
import { BookingController } from "../controllers/bookingControllerMg.js";

export const bookingRouter = Router()

bookingRouter.post('/', BookingController.create)

bookingRouter.delete('/:id',BookingController.deleteById)

bookingRouter.get('/:id',BookingController.getBookingByUser)