"use client";

import Image from "next/image";
import img from "@/public/globe.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { Card, CardContent, Typography, Box, Chip, Stack } from "@mui/material";

const ImageCard = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const previewImageModal = () => {
    console.log("preview image modal");
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Card
      onClick={previewImageModal}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: "100%",
        maxWidth: 300,
        borderRadius: "12px",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: isHovered ? "translateY(-4px)" : "none",
        boxShadow: isHovered
          ? "0 10px 20px rgba(0,0,0,0.1)"
          : "0 4px 8px rgba(0,0,0,0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Image with overlay effect */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingBottom: "100%",
          overflow: "hidden",
        }}
      >
        <Image
          src={img}
          alt="Placeholder Image"
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />

        {/* Hover overlay */}
        {isHovered && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "white",
                fontWeight: 500,
                backgroundColor: "rgba(0,0,0,0.5)",
                px: 2,
                py: 1,
                borderRadius: 4,
              }}
            >
              View Details
            </Typography>
          </Box>
        )}
      </Box>

      {/* Card content */}
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="h6"
          component="h5"
          sx={{
            fontWeight: 600,
            mb: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          This is the title of the image
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Chip
            icon={<VisibilityIcon fontSize="small" />}
            label="500"
            size="small"
            sx={{
              backgroundColor: "transparent",
              border: "1px solid #e0e0e0",
            }}
          />
          <Chip
            icon={
              isLiked ? (
                <FavoriteIcon fontSize="small" color="error" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )
            }
            label="44"
            size="small"
            onClick={toggleLike}
            sx={{
              backgroundColor: "transparent",
              border: "1px solid #e0e0e0",
              "&:hover": {
                backgroundColor: "rgba(255,0,0,0.05)",
              },
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
