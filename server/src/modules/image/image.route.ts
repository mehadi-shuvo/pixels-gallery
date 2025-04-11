import express from "express";
import { imageControllers } from "./image.controller";

const router = express.Router();

router.post("/", imageControllers.createImage);
router.get("/", imageControllers.getImages);

export const ImageRouter = router;
