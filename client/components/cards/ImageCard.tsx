"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, Typography, Box, Chip, Stack } from "@mui/material";
import {
  Visibility,
  FavoriteBorder,
  Favorite,
  Close,
  ZoomIn,
  ZoomOut,
} from "@mui/icons-material";

const ImageCard = ({
  id,
  src,
  title,
  views: initialViews,
  likes,
}: {
  id: string;
  src: string;
  title: string;
  views: number;
  likes: number;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [views, setViews] = useState(initialViews);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside content
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowModal(false);
        setZoom(1);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleZoom = (direction: "in" | "out") => {
    setZoom((prev) => {
      if (direction === "in") return Math.min(prev + 0.25, 3);
      return Math.max(prev - 0.25, 0.5);
    });
  };

  const handlePreview = async () => {
    try {
      // Call the API to update views
      const response = await fetch(`http://localhost:5000/api/images/${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to update view count");
      }

      const data = await response.json();

      // Update the views count if the API call was successful
      if (data.success && data.data) {
        setViews(data.data.views);
      }

      // Show the modal
      setShowModal(true);
    } catch (error) {
      console.error("Error updating view count:", error);
      // Still show the modal even if view count update fails
      setShowModal(true);
    }
  };

  return (
    <>
      {/* Image Card */}
      <Card
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
        onClick={handlePreview}
      >
        {/* Image with hover effect */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            paddingBottom: "100%",
            overflow: "hidden",
          }}
        >
          <Image
            src={src}
            alt={title}
            fill
            style={{
              objectFit: "cover",
              transition: "transform 0.5s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />

          {isHovered && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.5)",
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

        {/* Card footer */}
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Chip
              icon={<Visibility />}
              label={views}
              size="small"
              variant="outlined"
            />
            <Chip
              icon={isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
              label={likes + (isLiked ? 1 : 0)}
              size="small"
              variant="outlined"
              onClick={toggleLike}
            />
          </Stack>
        </CardContent>
      </Card>

      {/* Custom Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="relative w-full max-w-4xl max-h-screen"
          >
            {/* Zoomed Image */}
            <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
              <Image
                src={src}
                alt={title}
                width={1200}
                height={1200}
                className="w-4/5 h-4/5 object-contain transition-transform duration-300"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>

            {/* Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => handleZoom("in")}
                className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                aria-label="Zoom in"
              >
                <ZoomIn />
              </button>
              <button
                onClick={() => handleZoom("out")}
                className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                aria-label="Zoom out"
              >
                <ZoomOut />
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setZoom(1);
                }}
                className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                aria-label="Close"
              >
                <Close />
              </button>
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-2 rounded-lg">
              <h3 className="font-semibold">{title}</h3>
              <div className="flex gap-4 mt-1 text-sm">
                <span className="flex items-center gap-1">
                  <Visibility fontSize="small" /> {views}
                </span>
                <span className="flex items-center gap-1">
                  <Favorite fontSize="small" /> {likes + (isLiked ? 1 : 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCard;
