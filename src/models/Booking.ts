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

// The frontend reads .id, so rename Mongo's _id to id and drop __v.
bookingSchema.set("toJSON", {
  transform(_doc, ret) {
    const out = ret as unknown as Record<string, unknown>;
    out.id = String(out._id);
    delete out._id;
    delete out.__v;
    return out;
  },
});

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);