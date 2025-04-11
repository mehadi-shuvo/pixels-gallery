/* eslint-disable @typescript-eslint/no-unused-vars */
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
      // Auto-start upload when files are selected
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
        backgroundColor: "background.paper",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 600, mb: 2 }}
      >
        Share Your Creative Work
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Drag & drop images or click to browse. Add a title and tags to organize
        your content.
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        {/* File Drop Zone */}
        <Box
          sx={{
            border: "2px dashed",
            borderColor: "divider",
            borderRadius: 2,
            p: 4,
            textAlign: "center",
            mb: 3,
            backgroundColor: "action.hover",
            transition: "all 0.3s",
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "action.selected",
            },
          }}
        >
          <CloudUpload sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Drag & Drop Images Here
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            or
          </Typography>
          <Button
            variant="contained"
            component="label"
            color="primary"
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
          <Typography variant="caption" display="block" sx={{ mt: 2 }}>
            Supports JPG, PNG, WEBP (Max 10MB each)
          </Typography>
        </Box>

        {/* Upload Progress */}
        {isUploading && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <CircularProgress size={24} sx={{ mr: 2 }} />
            <Typography>Uploading {files.length} images...</Typography>
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
              <Typography variant="subtitle1">
                Uploaded Images ({uploadedFiles.length})
              </Typography>
              <Chip
                icon={<Check />}
                label="Upload Complete"
                color="success"
                size="small"
                variant="outlined"
              />
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: 2,
              }}
            ></Box>
          </Box>
        )}

        {/* Title Input */}
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 3 }}
          required
          InputProps={{
            sx: { borderRadius: 2 },
          }}
        />

        {/* Tags Input */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Tags
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
                deleteIcon={<Close />}
                sx={{ mb: 1 }}
                color="primary"
                size="small"
              />
            ))}
          </Stack>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add tags to help others find your work..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            InputProps={{
              sx: { borderRadius: 2 },
              startAdornment: (
                <InputAdornment position="start">
                  <Tag color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    color="primary"
                    onClick={handleAddTag}
                    disabled={!tagInput.trim()}
                    sx={{ mr: -1 }}
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
          color="primary"
          size="large"
          fullWidth
          disabled={uploadedFiles.length === 0 || !title}
          sx={{
            py: 1.5,
            fontWeight: 600,
            borderRadius: 2,
            fontSize: "1rem",
          }}
        >
          Publish Your Work
        </Button>
      </Box>
    </Paper>
  );
}
