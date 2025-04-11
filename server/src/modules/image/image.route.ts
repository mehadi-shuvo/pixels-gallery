import express from "express";
import { imageControllers } from "./image.controller";

const router = express.Router();

router.post("/", imageControllers.createImage);

export const ImageRouter = router;
