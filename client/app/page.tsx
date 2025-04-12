"use client";

import ImageCard from "@/components/cards/ImageCard";
import { TImage } from "@/types";
import { useEffect, useState } from "react";
import {
  TextField,
  InputAdornment,
  Box,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HotImageSlider from "@/components/slider/HotImageSlider";
import toast from "react-hot-toast";

export default function Home() {
  const [images, setImages] = useState<TImage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const baseURL = "https://pixels-server-one.vercel.app/api";

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      let url = `${baseURL}/images`;
      if (searchQuery) {
        url += `?search=${encodeURIComponent(searchQuery)}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch images");

      const data = await res.json();
      setImages(data.data || []);
    } catch (err) {
      console.error("Failed to fetch images:", err);
      toast.error("Failed to load images");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchImages();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleDeleteImage = async (id: string) => {
    setIsDeleting(true);
    try {
      setImages((prevImages) => prevImages.filter((img) => img._id !== id));
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete image");
      fetchImages();
    } finally {
      setIsDeleting(false);
      fetchImages();
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        backgroundColor: "#F8F4E9",
        minHeight: "100vh",
      }}
    >
      <HotImageSlider />

      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: "#2E4C3E",
            fontFamily: "'Montserrat', sans-serif",
            mb: 2,
          }}
        >
          Pixels Gallery
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#2E4C3E",
            maxWidth: 600,
            mx: "auto",
          }}
        >
          Discover and explore breathtaking nature photography from around the
          world
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 6,
          px: 2,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search landscapes, wildlife, seasons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            maxWidth: 600,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#A4B494",
              },
              "&:hover fieldset": {
                borderColor: "#D17B60",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2E4C3E",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#2E4C3E" }} />
              </InputAdornment>
            ),
            sx: {
              color: "#2E4C3E",
              backgroundColor: "#F8F4E9",
              borderRadius: 1,
            },
          }}
        />
      </Box>

      {/* Images Grid */}
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
        >
          <CircularProgress sx={{ color: "#A4B494" }} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 4,
            px: { xs: 2, md: 4 },
          }}
        >
          {images.map((img: TImage) => (
            <ImageCard
              key={img._id}
              id={img._id}
              src={img.imageURL}
              title={img.title}
              views={img.views || 0}
              likes={img.likes || 0}
              onDelete={handleDeleteImage}
              isDeleting={isDeleting}
            />
          ))}
        </Box>
      )}

      {!isLoading && images.length === 0 && (
        <Box
          textAlign="center"
          mt={4}
          sx={{
            backgroundColor: "rgba(164, 180, 148, 0.2)",
            p: 4,
            borderRadius: 2,
            maxWidth: 600,
            mx: "auto",
          }}
        >
          <Typography variant="body1" sx={{ color: "#2E4C3E" }}>
            No images found. Try search again.
          </Typography>
        </Box>
      )}
    </Container>
  );
}
