import express from "express";
import storyRouter from "./routes/story.route.js";

const app = express();

app.use(express.json());
app.use("/stories", storyRouter);

export default app;
