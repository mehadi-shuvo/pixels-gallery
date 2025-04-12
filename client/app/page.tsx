"use client";

import ImageCard from "@/components/cards/ImageCard";
import { TImage } from "@/types";
import { useEffect, useState } from "react";
// import ImageCard from "@/components/cards/ImageCard";
// import { TImage } from "..";

export default function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/images");
        const data = await res.json();
        setImages(data.data);
      } catch (err) {
        console.error("Failed to fetch images:", err);
      }
    };

    fetchImages();
  }, []);
  return (
    <div>
      <div className="my-10 grid items-center justify-center grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-4/5 mx-auto">
        {images.map((img: TImage, idx: number) => (
          <ImageCard
            key={img.title + idx}
            src={img.imageURL}
            title={img.title}
            views={img.views || 0}
            likes={img.likes || 0}
          />
        ))}
      </div>
    </div>
  );
}
