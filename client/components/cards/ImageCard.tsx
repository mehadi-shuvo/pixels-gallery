"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import {
  Visibility,
  FavoriteBorder,
  Favorite,
  Close,
  ZoomIn,
  ZoomOut,
  Delete,
} from "@mui/icons-material";
import toast from "react-hot-toast";

const ImageCard = ({
  id,
  src,
  title,
  views: initialViews,
  likes: initialLikes,
  onDelete,
  isDeleting,
}: {
  id: string;
  src: string;
  title: string;
  views: number;
  likes: number;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [views, setViews] = useState(initialViews);
  const [likes, setLikes] = useState(initialLikes);
  const modalRef = useRef<HTMLDivElement>(null);
  const baseURL = "https://pixels-server-one.vercel.app/api";

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

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      let response;
      if (isLiked) {
        response = await fetch(`${baseURL}/images/${id}/unlike`, {
          method: "PUT",
        });
      } else {
        response = await fetch(`${baseURL}/images/${id}/like`, {
          method: "PUT",
        });
      }

      if (!response.ok)
        throw new Error(`Failed to ${isLiked ? "unlike" : "like"} image`);

      const data = await response.json();
      if (data.success && data.data) {
        setLikes(data.data.likes);
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error(`Error ${isLiked ? "unliking" : "liking"} image:`, error);
    }
  };

  const handleZoom = (direction: "in" | "out") => {
    setZoom((prev) => {
      if (direction === "in") return Math.min(prev + 0.25, 3);
      return Math.max(prev - 0.25, 0.5);
    });
  };

  const handlePreview = async () => {
    try {
      const response = await fetch(`${baseURL}/images/${id}/view`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to update view count");

      const data = await response.json();
      if (data.success && data.data) {
        setViews(data.data.views);
      }
      setShowModal(true);
    } catch (error) {
      console.error("Error updating view count:", error);
      setShowModal(true);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDeleting) return;

    // Show confirmation dialog
    const confirm = await toast.promise(
      new Promise((resolve) => {
        toast(
          (t) => (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Are you sure you want to delete this image?
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    toast.dismiss(t.id);
                    resolve(true);
                  }}
                  sx={{
                    backgroundColor: "#D17B60",
                    "&:hover": { backgroundColor: "#b3664e" },
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    toast.dismiss(t.id);
                    resolve(false);
                  }}
                  sx={{
                    borderColor: "#A4B494",
                    color: "#2E4C3E",
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </Box>
          ),
          {
            duration: Infinity,
            style: {
              backgroundColor: "#F8F4E9",
              color: "#2E4C3E",
              border: "1px solid #A4B494",
              maxWidth: "400px",
            },
          }
        );
      }),
      {
        loading: "Processing...",
        success: (confirmed) => (confirmed ? "Deleting..." : "Cancelled"),
        error: "Error confirming deletion",
      }
    );

    if (!confirm) return;

    try {
      const response = await fetch(`${baseURL}/images/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete image");
      }

      if (onDelete) {
        onDelete(id);
      }
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete image");
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
            ? "0 10px 20px rgba(46, 76, 62, 0.15)"
            : "0 4px 8px rgba(46, 76, 62, 0.1)",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#F8F4E9",
          border: "1px solid #A4B494",
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
                bgcolor: "rgba(46, 76, 62, 0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#F8F4E9",
                  bgcolor: "rgba(164, 180, 148, 0.7)",
                  px: 2,
                  py: 1,
                  borderRadius: 4,
                  fontWeight: 500,
                }}
              >
                View Details
              </Typography>
            </Box>
          )}
        </Box>

        {/* Card footer */}
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              color: "#2E4C3E",
              fontWeight: 600,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {title}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Chip
              icon={<Visibility sx={{ color: "#2E4C3E" }} />}
              label={views}
              size="small"
              variant="outlined"
              sx={{
                color: "#2E4C3E",
                borderColor: "#A4B494",
                "& .MuiChip-label": { fontWeight: 500 },
              }}
            />
            <Chip
              icon={
                isLiked ? (
                  <Favorite sx={{ color: "#D17B60" }} />
                ) : (
                  <FavoriteBorder sx={{ color: "#2E4C3E" }} />
                )
              }
              label={likes}
              size="small"
              variant="outlined"
              onClick={handleLike}
              sx={{
                color: isLiked ? "#D17B60" : "#2E4C3E",
                borderColor: isLiked ? "#D17B60" : "#A4B494",
                "&:hover": {
                  backgroundColor: "rgba(209, 123, 96, 0.1)",
                },
                "& .MuiChip-label": { fontWeight: 500 },
              }}
            />
          </Stack>
          <IconButton
            onClick={handleDelete}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#D17B60", // Terracotta
              backgroundColor: "rgba(248, 244, 233, 0.7)", // Semi-transparent Cream
              "&:hover": {
                backgroundColor: "rgba(209, 123, 96, 0.2)", // Light Terracotta
              },
            }}
            aria-label="Delete image"
          >
            <Delete />
          </IconButton>
        </CardContent>
      </Card>

      {/* Custom Modal */}
      {showModal && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            bgcolor: "rgba(46, 76, 62, 0.9)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
          }}
        >
          <Box
            ref={modalRef}
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: "1200px",
              maxHeight: "90vh",
            }}
          >
            {/* Zoomed Image */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={src}
                alt={title}
                width={1200}
                height={1200}
                style={{
                  width: "80%",
                  height: "80%",
                  objectFit: "contain",
                  transition: "transform 0.3s",
                  transform: `scale(${zoom})`,
                }}
              />
            </Box>

            {/* Controls */}
            <Box
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                display: "flex",
                gap: 1,
              }}
            >
              <IconButton
                onClick={() => handleZoom("in")}
                sx={{
                  color: "#F8F4E9",
                  bgcolor: "rgba(46, 76, 62, 0.5)",
                  "&:hover": {
                    bgcolor: "rgba(209, 123, 96, 0.7)",
                  },
                }}
                aria-label="Zoom in"
              >
                <ZoomIn />
              </IconButton>
              <IconButton
                onClick={() => handleZoom("out")}
                sx={{
                  color: "#F8F4E9",
                  bgcolor: "rgba(46, 76, 62, 0.5)",
                  "&:hover": {
                    bgcolor: "rgba(209, 123, 96, 0.7)",
                  },
                }}
                aria-label="Zoom out"
              >
                <ZoomOut />
              </IconButton>
              <IconButton
                onClick={() => {
                  setShowModal(false);
                  setZoom(1);
                }}
                sx={{
                  color: "#F8F4E9",
                  bgcolor: "rgba(46, 76, 62, 0.5)",
                  "&:hover": {
                    bgcolor: "rgba(209, 123, 96, 0.7)",
                  },
                }}
                aria-label="Close"
              >
                <Close />
              </IconButton>
            </Box>

            {/* Image Info */}
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                bgcolor: "rgba(46, 76, 62, 0.7)",
                color: "#F8F4E9",
                px: 3,
                py: 2,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Visibility fontSize="small" />
                  <Typography variant="body2">{views}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: isLiked ? "#D17B60" : "inherit",
                  }}
                >
                  <Favorite fontSize="small" />
                  <Typography variant="body2">{likes}</Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ImageCard;
