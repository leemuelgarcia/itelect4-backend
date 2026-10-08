export interface User {
  id: number;
  name: string;
  email: string;
  role: "tutor" | "tutee";
  isActive: boolean;
}

export interface Session {
  id: number;
  tutorId: number;
  title: string;
  description: string;
  subject: string;
  duration: number;
}

export interface Booking {
  id: number;
  sessionId: number;
  tuteeId: string;
  status: "requested" | "confirmed" | "completed";
  bookedAt: Date;
  learningGoal: string;
}