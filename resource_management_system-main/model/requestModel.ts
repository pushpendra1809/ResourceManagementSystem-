import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  description: { type: String, required: true },
  resourceName: { type: String, required: true },
  label: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    required: true,
  },
});

export const Request =
  mongoose.models?.Request || mongoose.model("Request", requestSchema);
