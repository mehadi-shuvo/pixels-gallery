import { Image } from "./image.model";

const createImages = async (payload: {
  title: string;
  tags?: string[];
  imageURLs: string[];
}) => {
  const { title, tags, imageURLs } = payload;
  const imagesToInsert = imageURLs.map((imageURL) => ({
    title,
    tags,
    imageURL,
  }));

  const data = await Image.insertMany(imagesToInsert);

  return data;
};

export const imageServices = {
  createImages,
};
