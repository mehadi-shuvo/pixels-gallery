"use client";
import { useState, useRef, ChangeEvent } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Chip,
  Avatar,
  IconButton,
  InputAdornment,
  Stack,
  CircularProgress,
} from "@mui/material";
import { Close, Add, Tag, CloudUpload } from "@mui/icons-material";

export default function ImageUploadWithTags() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const removeImage = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      console.log({
        title,
        tags,
        files: uploadedFiles.map((f) => f.name),
      });
      setIsUploading(false);
    }, 1500);
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
        sx={{ fontWeight: 600 }}
      >
        Share Your Creative Work
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Upload your images, add a title, and tag them to share with the
        community.
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        {/* File Upload Section */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          style={{ display: "none" }}
        />

        <Button
          variant="contained"
          color="secondary"
          startIcon={<CloudUpload />}
          onClick={() => fileInputRef.current?.click()}
          sx={{ mb: 3 }}
        >
          {uploadedFiles.length > 0 ? "Add More Images" : "Upload Images"}
        </Button>

        {/* Image Preview Grid */}
        {uploadedFiles.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: 2,
              mb: 3,
            }}
          >
            {uploadedFiles.map((file, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  borderRadius: 1,
                  overflow: "hidden",
                  height: 150,
                }}
              >
                <Box
                  component="img"
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.7)",
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            ))}
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
                avatar={
                  <Avatar
                    sx={{ bgcolor: "primary.main", width: 24, height: 24 }}
                  >
                    <Tag sx={{ fontSize: 14 }} />
                  </Avatar>
                }
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            InputProps={{
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
          disabled={uploadedFiles.length === 0 || !title || isUploading}
          sx={{ py: 1.5, fontWeight: 600 }}
        >
          {isUploading ? (
            <>
              <CircularProgress size={24} sx={{ mr: 1 }} />
              Uploading...
            </>
          ) : (
            "Share Your Work"
          )}
        </Button>
      </Box>
    </Paper>
  );
}
