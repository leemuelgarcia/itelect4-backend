import { Router, Request, Response } from "express";

const router = Router();

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

router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ sessions });
});

router.get("/:id", (req: Request, res: Response) => {
  const session = sessions.find(
    (item) => item.id === req.params.id
  );

  if (!session) {
    res.status(404).json({
      message: "Tutoring session not found",
    });
    return;
  }

  res.status(200).json({ session });
});

export default router;
