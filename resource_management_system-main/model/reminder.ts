import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  name: { type: String, required: true },
  reminderDate: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  description: { type: String, required: true },
  resourceName: { type: String, required: true },
});

export const Reminder =
  mongoose.models?.Reminder || mongoose.model("Reminder", reminderSchema);
