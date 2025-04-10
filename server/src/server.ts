import mongoose from "mongoose";
import app from "./app";

import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3333;
const DB_URL = process.env.DB_URL as string;

async function main() {
  try {
    await mongoose.connect(DB_URL);
    console.log("mongodb connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err: any) {
    throw new Error(err.massage);
  }
}

main();
