import mongoose, { Schema, model, models } from "mongoose";

const urlSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: true
    },
    shortCode: {
      type: String,
      required: true,
      unique: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 30 // 30 days in seconds
    }
  },
  { timestamps: true }
);

// Fix: Reference correct interface name in the model creation
const Url = models?.Url || model("Url", urlSchema);

export default Url;
