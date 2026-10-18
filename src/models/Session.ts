
import mongoose, { Document, Schema } from "mongoose";

export interface ISession extends Document {
  id: string;
  tutorId: number;
  title: string;
  description: string;
  subject: string;
  duration: number;
}

const sessionSchema = new Schema<ISession>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    tutorId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const SessionModel = mongoose.model<ISession>(
  "Session",
  sessionSchema
);
