import express from "express";
import cors from "cors";
import { ImageRouter } from "./modules/image/image.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/images", ImageRouter);

export default app;
