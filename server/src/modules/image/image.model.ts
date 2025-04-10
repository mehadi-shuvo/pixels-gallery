import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  imageURL: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
  views: {
    type: Number,
    default: 0,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

imageSchema.index({ title: "text", tags: "text" });

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
