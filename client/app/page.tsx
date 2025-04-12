"use client";

import ImageCard from "@/components/cards/ImageCard";
import { TImage } from "@/types";
import { useEffect, useState } from "react";
import { TextField, InputAdornment, Box, Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HotImageSlider from "@/components/slider/HotImageSlider";

export default function Home() {
  const [images, setImages] = useState<TImage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        let url = "http://localhost:5000/api/images";
        if (searchQuery) {
          url += `?search=${encodeURIComponent(searchQuery)}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setImages(data.data || []);
      } catch (err) {
        console.error("Failed to fetch images:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Add debounce to prevent too many API calls
    const debounceTimer = setTimeout(() => {
      fetchImages();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <Container maxWidth="xl">
      <HotImageSlider />
      <h1 className="text-3xl font-bold text-center mb-4">Image Gallery</h1>
      <p className="text-center mb-8">
        Search and explore a variety of images.
      </p>
      {/* Search Bar */}
      <Box sx={{ my: 4 }}>
        {/* Search Bar */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ maxWidth: 600 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Images Grid */}
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
          >
            <p>Loading images...</p>
          </Box>
        ) : (
          <div className="grid items-center justify-center grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-4/5 mx-auto">
            {images.map((img: TImage, idx: number) => (
              <ImageCard
                key={img.title + idx}
                id={img._id}
                src={img.imageURL}
                title={img.title}
                views={img.views || 0}
                likes={img.likes || 0}
              />
            ))}
          </div>
        )}

        {!isLoading && images.length === 0 && (
          <Box textAlign="center" mt={4}>
            <p>No images found. Try a different search term.</p>
          </Box>
        )}
      </Box>
    </Container>
  );
}
