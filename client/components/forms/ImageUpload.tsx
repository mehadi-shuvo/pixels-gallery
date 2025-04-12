"use client";
import { useState, useCallback, ChangeEvent } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  CircularProgress,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Close, Add, Tag, CloudUpload, Check } from "@mui/icons-material";
import { uploadImage } from "@/utils/cloudinary";
import toast from "react-hot-toast";

interface UploadedFile {
  url: string;
  name: string;
  size: number;
}

export default function ModernImageUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      handleUpload(selectedFiles);
    }
  };

  const handleUpload = useCallback(async (filesToUpload: File[]) => {
    if (filesToUpload.length === 0) return;

    setIsUploading(true);
    setUploadedFiles([]);

    try {
      const uploaded = await Promise.all(
        filesToUpload.map(async (file) => {
          const url = await uploadImage(file);
          return {
            url,
            name: file.name,
            size: file.size,
          };
        })
      );
      setUploadedFiles(uploaded);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedFiles.length === 0 || !title) {
      toast.error("Please provide a title and at least one image.");
      return;
    }

    try {
      const imageURLs = uploadedFiles.map((file) => file.url);

      const response = await fetch("http://localhost:5000/api/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          tags,
          imageURLs,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Images uploaded successfully!");
        setTitle("");
        setTags([]);
        setUploadedFiles([]);
      } else {
        toast.error(data.message || "Failed to upload images.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Submit error:", error);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 4,
        maxWidth: 800,
        mx: "auto",
        my: 8,
        backgroundColor: "#F8F4E9", // Cream background
        border: "1px solid #A4B494", // Sage Green border
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 2,
          color: "#2E4C3E", // Deep Green
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        Share Your Nature Photos
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: "#2E4C3E", // Deep Green
        }}
      >
        Upload your outdoor photography to inspire others. Add descriptive tags
        to help others discover your work.
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        {/* File Drop Zone */}
        <Box
          sx={{
            border: "2px dashed",
            borderColor: "#A4B494", // Sage Green
            borderRadius: 2,
            p: 4,
            textAlign: "center",
            mb: 3,
            backgroundColor: "rgba(164, 180, 148, 0.1)", // Light Sage Green
            transition: "all 0.3s",
            "&:hover": {
              borderColor: "#D17B60", // Terracotta on hover
              backgroundColor: "rgba(164, 180, 148, 0.2)",
            },
          }}
        >
          <CloudUpload
            sx={{
              fontSize: 48,
              color: "#2E4C3E", // Deep Green
              mb: 2,
            }}
          />
          <Typography variant="h6" gutterBottom sx={{ color: "#2E4C3E" }}>
            Drag & Drop Images Here
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "#2E4C3E" }}>
            or
          </Typography>
          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: "#2E4C3E", // Deep Green
              color: "#F8F4E9", // Cream
              "&:hover": {
                backgroundColor: "#D17B60", // Terracotta on hover
              },
            }}
            disabled={isUploading}
          >
            Browse Files
            <input
              type="file"
              hidden
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </Button>
          <Typography
            variant="caption"
            display="block"
            sx={{ mt: 2, color: "#2E4C3E" }}
          >
            Supports JPG, PNG, WEBP (Max 10MB each)
          </Typography>
        </Box>

        {/* Upload Progress */}
        {isUploading && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <CircularProgress
              size={24}
              sx={{ mr: 2, color: "#A4B494" }} // Sage Green
            />
            <Typography sx={{ color: "#2E4C3E" }}>
              Uploading {files.length} images...
            </Typography>
          </Box>
        )}

        {/* Uploaded Images Preview */}
        {uploadedFiles.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="subtitle1" sx={{ color: "#2E4C3E" }}>
                Uploaded Images ({uploadedFiles.length})
              </Typography>
              <Chip
                icon={<Check sx={{ color: "#2E4C3E" }} />}
                label="Upload Complete"
                size="small"
                variant="outlined"
                sx={{
                  borderColor: "#A4B494", // Sage Green
                  color: "#2E4C3E", // Deep Green
                }}
              />
            </Box>
          </Box>
        )}

        {/* Title Input */}
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#A4B494", // Sage Green
              },
              "&:hover fieldset": {
                borderColor: "#D17B60", // Terracotta
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2E4C3E", // Deep Green
              },
            },
          }}
          required
          InputProps={{
            sx: {
              borderRadius: 2,
              color: "#2E4C3E", // Deep Green
              backgroundColor: "#F8F4E9", // Cream
            },
          }}
          InputLabelProps={{
            sx: {
              color: "#2E4C3E", // Deep Green
            },
          }}
        />

        {/* Tags Input */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ color: "#2E4C3E" }}
          >
            Tags (e.g., landscape, wildlife, sunset)
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
                deleteIcon={<Close sx={{ color: "#2E4C3E" }} />}
                sx={{
                  mb: 1,
                  backgroundColor: "#A4B494", // Sage Green
                  color: "#F8F4E9", // Cream
                  "& .MuiChip-deleteIcon": {
                    color: "#F8F4E9", // Cream
                    "&:hover": {
                      color: "#D17B60", // Terracotta
                    },
                  },
                }}
                size="small"
              />
            ))}
          </Stack>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add nature-related tags..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            InputProps={{
              sx: {
                borderRadius: 2,
                color: "#2E4C3E", // Deep Green
                backgroundColor: "#F8F4E9", // Cream
                "& fieldset": {
                  borderColor: "#A4B494", // Sage Green
                },
              },
              startAdornment: (
                <InputAdornment position="start">
                  <Tag sx={{ color: "#2E4C3E" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={handleAddTag}
                    disabled={!tagInput.trim()}
                    sx={{
                      mr: -1,
                      color: "#2E4C3E", // Deep Green
                      "&:hover": {
                        color: "#D17B60", // Terracotta
                      },
                    }}
                  >
                    <Add />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={uploadedFiles.length === 0 || !title}
          sx={{
            py: 1.5,
            fontWeight: 600,
            borderRadius: 2,
            fontSize: "1rem",
            backgroundColor: "#2E4C3E", // Deep Green
            color: "#F8F4E9", // Cream
            "&:hover": {
              backgroundColor: "#D17B60", // Terracotta
            },
            "&:disabled": {
              backgroundColor: "rgba(164, 180, 148, 0.5)", // Light Sage Green
              color: "rgba(46, 76, 62, 0.5)", // Light Deep Green
            },
          }}
        >
          Publish Your Photos
        </Button>
      </Box>
    </Paper>
  );
}
