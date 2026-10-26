// ===== SESSION 12: a NEW file =========================================
// One file, one JWT-protected route: POST /api/ai. Supertest sends
// real HTTP requests to the real Express app, without opening a port.
import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../src/server";

// server.ts waits for connectDB() in front of every route, and there is
// no database here or on GitHub's machine. This replaces the whole
// src/config/db module, for this test file only, with one whose
// connectDB does nothing. Vitest moves vi.mock above the imports, so
// server.ts gets this version even though it is imported first.
vi.mock("../src/config/db", () => ({
  connectDB: async () => {},
}));

// A token made the way POST /api/auth/login makes one: the same
// payload shape, signed with the same JWT_SECRET. No user has to
// exist, because authMiddleware only checks the signature.
function tokenFor(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "5m",
  });
}

describe("POST /api/ai", () => {
  it("answers 401 when there is no token", async () => {
    const res = await request(app)
      .post("/api/ai")
      .send({ prompt: "I want help learning React and TypeScript." });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Authentication token is required");
  });

  it("answers 401 when the token was signed with another secret", async () => {
    const forged = jwt.sign({ userId: "someone" }, "not-the-secret");

    const res = await request(app)
      .post("/api/ai")
      .set("Authorization", `Bearer ${forged}`)
      .send({ prompt: "I want help learning React and TypeScript." });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid or expired authentication token");
  });

  it("lets a valid token through, then checks the body", async () => {
    // "Too short" is 9 characters, so aiRequestSchema refuses it
    // before reviewProject() runs -- Gemini is never called.
    const res = await request(app)
      .post("/api/ai")
      .set("Authorization", `Bearer ${tokenFor("test-user")}`)
      .send({ prompt: "Too short" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed");
    expect(res.body.errors).toEqual([
      "Describe what you want to learn in at least 20 characters.",
    ]);
  });
});
