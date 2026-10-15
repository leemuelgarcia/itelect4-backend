import { Router, Request, Response } from "express";
import { SessionModel } from "../models/Session.js";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const sessions = await SessionModel.find().sort({ id: 1 });
    return res.status(200).json({ sessions });
  } catch (error) {
    console.error("Failed to fetch tutoring sessions:", error);
    return res.status(500).json({ message: "Failed to fetch tutoring sessions" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const session = await SessionModel.findOne({ id: req.params.id });

    if (!session) {
      return res.status(404).json({ message: "Tutoring session not found" });
    }

    return res.status(200).json({ session });
  } catch (error) {
    console.error("Failed to fetch tutoring session:", error);
    return res.status(500).json({ message: "Failed to fetch tutoring session" });
  }
});

export default router;