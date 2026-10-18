
import dotenv from "dotenv";
import mongoose from "mongoose";
import { SessionModel } from "./models/Session.js";

dotenv.config();

const sessions = [
  {
    id: "1",
    tutorId: 1,
    title: "Introduction to Web Development",
    description:
      "Learn the fundamentals of HTML, CSS, and JavaScript through guided exercises.",
    subject: "Web Development",
    duration: 60,
  },
  {
    id: "2",
    tutorId: 1,
    title: "TypeScript Fundamentals",
    description:
      "Understand TypeScript types, interfaces, unions, and generics.",
    subject: "TypeScript",
    duration: 60,
  },
  {
    id: "3",
    tutorId: 1,
    title: "React Basics",
    description:
      "Learn React components, props, state, and basic application structure.",
    subject: "React",
    duration: 90,
  },
];

const seedSessions = async (): Promise<void> => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error("MONGODB_URI is not defined in .env");
  }

  try {
    await mongoose.connect(mongoURI);

    for (const session of sessions) {
      await SessionModel.updateOne(
        { id: session.id },
        { $set: session },
        { upsert: true }
      );
    }

    console.log("Tutoring sessions seeded successfully.");
  } catch (error) {
    console.error("Failed to seed tutoring sessions:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedSessions();
