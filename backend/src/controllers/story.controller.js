import { generateStoryFromGemini } from "../services/story.service.js";
import { generateImagesForStory } from "../services/image.service.js";

export const generateStory = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ message: "Prompt is required" });

    // Generate story text first
    const story = await generateStoryFromGemini(prompt);

    // Generate images for each segment
    const storyWithImages = await generateImagesForStory(story);

    res.json({ story: storyWithImages });
  } catch (err) {
    next(err);
  }
};
