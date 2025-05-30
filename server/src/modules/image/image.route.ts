import express from "express";
import { imageControllers } from "./image.controller";

const router = express.Router();

router.post("/", imageControllers.createImage);
router.get("/", imageControllers.getImages);
router.get("/:id/view", imageControllers.updateImageView);
router.put("/:id/like", imageControllers.updateImageLike);
router.put("/:id/unlike", imageControllers.removeImageLike);
router.delete("/:id", imageControllers.deleteImage);

export const ImageRouter = router;
