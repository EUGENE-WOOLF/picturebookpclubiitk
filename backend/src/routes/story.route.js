import express from "express";
import { generateStory } from "../controllers/story.controller.js";

const router = express.Router();

router.post("/generate", generateStory); // User sends prompt here

export default router;
