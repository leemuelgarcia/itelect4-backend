// ===== GT5: a NEW file ==============================================
import "dotenv/config";
import { reviewProject } from "./ai/gemini.js";

// npm run try-ai. One real request to Gemini from your terminal --
// the same function POST /api/ai calls, with no Express, no token
// and no database. If this prints a review, the key, the model name
// and the schema all work.
async function tryAi() {
  const review = await reviewProject(
    "I am learning React and TypeScript for a peer tutoring app. I " +
      "can build a page with useState, but I do not understand how to " +
      "type the props I pass between components. I would like a tutor " +
      "to go through it with me before my exam next week.",
  );
  console.log(JSON.stringify(review, null, 2));
}

tryAi().catch((err: unknown) => {
  console.error("Gemini call failed:", err);
  process.exit(1);
});
