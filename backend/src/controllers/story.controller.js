import { generateStoryFromGemini } from "../services/story.service.js";

export const generateStory = async (req, res, next) => {
  try {
    const { prompt } = req.body; // Get user prompt
    if (!prompt) return res.status(400).json({ message: "Prompt is required" });

    const story = await generateStoryFromGemini(prompt); // Call service
    res.json({ story }); // Return story to frontend
  } catch (err) {
    next(err); // Forward error to global handler
  }
};
