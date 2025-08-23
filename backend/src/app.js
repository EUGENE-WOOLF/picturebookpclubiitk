import express from "express";
import storyRouter from "./routes/story.route.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/stories", storyRouter);

export default app;
