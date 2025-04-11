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

interface GetImageQuery {
  search?: string;
  tags?: string[];
  sortBy?: "popular" | "hot";
}

const getImages = async (query: GetImageQuery) => {
  const { search, tags, sortBy } = query;

  const filter: any = {};

  if (search) {
    filter.$text = { $search: search };
  }

  if (tags && tags.length > 0) {
    filter.tags = { $in: tags };
  }

  const sort: any = {};

  if (sortBy === "popular") {
    sort.likes = -1;
    sort.views = -1;
  } else if (sortBy === "hot") {
    sort.createdAt = -1;
    sort.likes = -1;
    sort.views = -1;
  } else {
    sort.createdAt = -1;
  }

  const images = await Image.find(filter).sort(sort);

  return images;
};

export const imageServices = {
  createImages,
  getImages,
};
