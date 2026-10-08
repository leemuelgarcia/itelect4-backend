import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
  sessionId: number;
  tuteeId: string;
  status: "requested" | "confirmed" | "completed";
  learningGoal: string;
  bookedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    sessionId: {
      type: Number,
      required: true,
    },
    tuteeId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["requested", "confirmed", "completed"],
      default: "requested",
      required: true,
    },
    learningGoal: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 200,
      trim: true,
    },
    bookedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);