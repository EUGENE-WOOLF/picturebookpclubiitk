import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDAu1jQbBlnR-7hBgF_X-svi6fHQQBtoCs",
});

export async function generateStoryFromGemini(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are a creative story writer. Based on the following prompt: "${prompt}", 
write a children's story as a **valid JSON object**.

The JSON must follow this exact structure:

{
  "title": "string",
  "segments": [
    { "title": "Segment 1 title", "content": "Segment 1 text" },
    { "title": "Segment 2 title", "content": "Segment 2 text" }
  ]
}

- Return ONLY valid JSON, no \`\`\` fences, no extra text.
- Keep the story around 500 words.
- Language should be simple, suitable for children.
- Each segment must have a short descriptive title and content.
    `,
  });

  // ✅ Clean text and parse
  let text = response.text;
  text = text.replace(/```json|```/g, "").trim(); // remove markdown fences

  try {
    const story = JSON.parse(text);

    console.log("AI response:", story);
    return story;
  } catch (err) {
    console.error("Failed to parse AI response:", err, text);
    throw new Error("AI did not return valid JSON");
  }
}

// Run test
