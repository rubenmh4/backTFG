import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  message: {
    type: String,
    require: true,
  },
  user: {
    type: String,
    require: true,
  },
  time: { type: String,
     require: true },
});

export const Message = mongoose.model('Message',messageSchema)
