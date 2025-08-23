import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "path";

const ai = new GoogleGenAI({
  apiKey: "",
  // store your key in .env
});

/**
 * Generate images for each story segment and store them in public/images
 * @param {Object} story - Story object with segments
 * @returns Updated story object with imageUrl added to each segment
 */
export async function generateImagesForStory(story) {
  const outputDir = path.join(process.cwd(), "public", "images");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  let idx = 1;
  for (const segment of story.segments) {
    const prompt = `${segment.content}, mature picture book illustration, consistent characters, keep the style and tone according to the mood of prompt, the characters should look similar in all images, high quality, detailed, vibrant colors, artstation, trending on artstation, sharp focus, intricate details, digital painting, don't add any text in the image`;

    const response = await ai.models.generateImages({
      model: "imagen-4.0-generate-001",
      prompt,
      config: { numberOfImages: 1 },
    });

    const imgBytes = response.generatedImages[0].image.imageBytes;
    const buffer = Buffer.from(imgBytes, "base64");
    const fileName = `segment-${Date.now()}-${idx}.png`;
    const filePath = path.join(outputDir, fileName);

    fs.writeFileSync(filePath, buffer);
    segment.imageUrl = `/images/${fileName}`;
    idx++;
  }

  return story;
}
