import mongoose, { Schema, models } from "mongoose";

const MessageSchema = new Schema({
  id: { type: String, required: true, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: Date, default: Date.now },
  status: { type: String, enum: ["Sent", "Delivered", "Read"], default: "Sent" },
});

export const Message=  mongoose.models.Message || mongoose.model("Message", MessageSchema);
