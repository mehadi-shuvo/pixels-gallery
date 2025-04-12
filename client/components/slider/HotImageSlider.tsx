"use client";

import { useEffect, useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface TImage {
  _id: string;
  imageURL: string;
  title: string;
  views?: number;
  likes?: number;
}

const HotImageSlider = () => {
  const theme = useTheme();
  const [hotImages, setHotImages] = useState<TImage[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const hotRes = await fetch(
          "http://localhost:5000/api/images?sortBy=hot"
        );
        const hotData = await hotRes.json();
        setHotImages(hotData.data.slice(0, 3) || []);
      } catch (err) {
        console.error("Failed to fetch images:", err);
      }
    };

    fetchImages();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === hotImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? hotImages.length - 1 : prev - 1));
  };

  // Auto-advance slides
  useEffect(() => {
    if (hotImages.length > 1 && !isHovered) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [hotImages.length, currentSlide, isHovered]);

  return (
    <Box sx={{ my: 6, px: { xs: 2, sm: 0 } }}>
      {hotImages.length > 0 && (
        <Box
          sx={{
            position: "relative",
            maxWidth: "1200px",
            mx: "auto",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              mb: 3,
              fontWeight: 700,
              color: "text.primary",
              textAlign: "center",
              px: { xs: 2, sm: 0 },
            }}
          >
            Trending Now
          </Typography>

          <Box
            sx={{
              position: "relative",
              height: { xs: "250px", sm: "400px", md: "500px" },
              width: "100%",
              overflow: "hidden",
              borderRadius: 4,
              boxShadow: 6,
              "&:hover .slide-info": {
                transform: "translateY(0)",
              },
            }}
          >
            {hotImages.map((img, index) => (
              <Box
                key={img._id}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: index === currentSlide ? 1 : 0,
                  transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <Box
                  component="img"
                  src={img.imageURL}
                  alt={img.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    filter: "brightness(0.95)",
                  }}
                />
                <Box
                  className="slide-info"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                    color: "white",
                    p: 3,
                    pt: 6,
                    transform: "translateY(20px)",
                    transition: "transform 0.5s ease",
                    [theme.breakpoints.down("sm")]: {
                      transform: "translateY(0)",
                      p: 2,
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {img.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 3,
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Box
                        component="span"
                        sx={{
                          mr: 1,
                          fontSize: "1.2rem",
                        }}
                      >
                        👁️
                      </Box>
                      {img.views?.toLocaleString() || 0}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Box
                        component="span"
                        sx={{
                          mr: 1,
                          fontSize: "1.2rem",
                        }}
                      >
                        ❤️
                      </Box>
                      {img.likes?.toLocaleString() || 0}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}

            {/* Navigation Arrows - Only show on hover */}
            {isHovered && (
              <>
                <IconButton
                  onClick={prevSlide}
                  sx={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(5px)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.3)",
                    },
                    zIndex: 2,
                    transition: "all 0.3s ease",
                    width: 48,
                    height: 48,
                    [theme.breakpoints.down("sm")]: {
                      width: 40,
                      height: 40,
                      left: 8,
                    },
                  }}
                >
                  <ChevronLeft fontSize="large" />
                </IconButton>

                <IconButton
                  onClick={nextSlide}
                  sx={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(5px)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.3)",
                    },
                    zIndex: 2,
                    transition: "all 0.3s ease",
                    width: 48,
                    height: 48,
                    [theme.breakpoints.down("sm")]: {
                      width: 40,
                      height: 40,
                      right: 8,
                    },
                  }}
                >
                  <ChevronRight fontSize="large" />
                </IconButton>
              </>
            )}

            {/* Modern Slide Indicators */}
            <Box
              sx={{
                position: "absolute",
                bottom: 24,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 1.5,
                zIndex: 2,
                [theme.breakpoints.down("sm")]: {
                  bottom: 16,
                },
              }}
            >
              {hotImages.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  sx={{
                    width: index === currentSlide ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor:
                      index === currentSlide
                        ? "primary.main"
                        : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor:
                        index === currentSlide
                          ? "primary.dark"
                          : "rgba(255,255,255,0.7)",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default HotImageSlider;
