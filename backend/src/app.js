import express from "express";
import storyRouter from "./routes/story.routes.js";
import { errorHandler } from "./utils/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/stories", storyRouter);

app.use(errorHandler);

export default app;
