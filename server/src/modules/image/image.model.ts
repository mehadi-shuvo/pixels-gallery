import mongoose, { Schema, Document } from "mongoose";

interface IImage extends Document {
  title: string;
  imageURL: string;
  tags: string[];
  likes: number;
  views: number;
  createdAt: Date;
}

const imageSchema = new Schema<IImage>({
  title: { type: String, required: true, trim: true },
  imageURL: { type: String, required: true, trim: true },
  tags: { type: [String], default: [] },
  likes: { type: Number, default: 0, min: 0 },
  views: { type: Number, default: 0, min: 0 },
  createdAt: { type: Date, default: Date.now },
});

imageSchema.index({ title: "text", tags: "text" });

export const Image = mongoose.model<IImage>("Image", imageSchema);
