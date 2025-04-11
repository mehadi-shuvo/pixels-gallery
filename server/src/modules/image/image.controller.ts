import { Request, Response } from "express";
import { imageServices } from "./image.services";

const createImage = async (req: Request, res: Response) => {
  try {
    let {
      title,
      tags,
      imageURLs,
    }: { title: string; tags?: string[]; imageURLs: string | string[] } =
      req.body;

    imageURLs = Array.isArray(imageURLs) ? imageURLs : [imageURLs];

    const images = await imageServices.createImages({ title, tags, imageURLs });

    res.status(201).json({
      success: true,
      message:
        images.length > 1
          ? "Images created successfully."
          : "Image created successfully.",
      data: images,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create images.",
      error: error?.message,
    });
  }
};

const getImages = async (req: Request, res: Response) => {
  try {
    const {
      search,
      tags,
      sortBy,
    }: {
      search?: string;
      tags?: string | string[];
      sortBy?: "popular" | "hot";
    } = req.query;

    const images = await imageServices.getImages({
      search: search as string,
      tags: tags ? (Array.isArray(tags) ? tags : [tags as string]) : [],
      sortBy: sortBy as "popular" | "hot",
    });

    res.status(200).json({
      success: true,
      message: "Images fetched successfully.",
      data: images,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch images.",
      error: error?.message,
    });
  }
};

export const imageControllers = {
  createImage,
  getImages,
};
