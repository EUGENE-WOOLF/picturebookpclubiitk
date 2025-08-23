import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDAu1jQbBlnR-7hBgF_X-svi6fHQQBtoCs",
});

export async function generateStoryFromGemini(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:
      `You are a creative story writer. Write a children's story based on the following prompt: ${prompt}. The story should be engaging, imaginative, and suitable for children. Make sure to include a clear beginning, middle, and end, with vivid descriptions and relatable characters. Keep the language simple and easy to understand for young readers. The story should be around 500 words long.` +
      `the stort should be divided in segment with clear tittles segment 1 to segment n`,
  });
  return response.text;
}

//apiKey: "AIzaSyDAu1jQbBlnR-7hBgF_X-svi6fHQQBtoCs",
