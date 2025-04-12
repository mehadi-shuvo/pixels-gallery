import express from "express";
import { imageControllers } from "./image.controller";

const router = express.Router();

router.post("/", imageControllers.createImage);
router.get("/", imageControllers.getImages);
router.get("/:id", imageControllers.updateImageView);
router.delete("/:id", imageControllers.deleteImage);

export const ImageRouter = router;
