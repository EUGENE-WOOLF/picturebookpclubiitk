import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDAu1jQbBlnR-7hBgF_X-svi6fHQQBtoCs",
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:
      "Write a short story about a robot who loves to skateboard. Make it fun and engaging for kids. in different segment and keep the title segment 1 to n",
  });
  console.log(response.text);
}

await main();
//apiKey: "AIzaSyDAu1jQbBlnR-7hBgF_X-svi6fHQQBtoCs",
