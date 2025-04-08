"use client";

import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Stack,
} from "@mui/material";
import { Facebook, Instagram, Twitter, Pinterest } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2c3e50",
        color: "#ecf0f1",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 8 },
            mb: 4,
          }}
        >
          {/* About Section */}
          <Box sx={{ flex: 1, minWidth: { md: "300px" } }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#f1c40f" }}
            >
              Pixels Gallery
            </Typography>
            <Typography variant="body2">
              Discover and share beautiful images from around the world. Our
              gallery showcases stunning photography for everyone to enjoy.
            </Typography>
          </Box>

          {/* Links Sections */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 4, sm: 8 },
              flex: 2,
            }}
          >
            {/* Quick Links */}
            <Box sx={{ minWidth: "120px" }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#f1c40f" }}
              >
                Explore
              </Typography>
              <Stack
                component="ul"
                sx={{ listStyle: "none", p: 0, m: 0, gap: 1 }}
              >
                {["Popular", "Newest", "Categories", "Artists"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      color="inherit"
                      underline="hover"
                      sx={{ display: "block" }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </Stack>
            </Box>

            {/* Legal Links */}
            <Box sx={{ minWidth: "120px" }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#f1c40f" }}
              >
                Legal
              </Typography>
              <Stack
                component="ul"
                sx={{ listStyle: "none", p: 0, m: 0, gap: 1 }}
              >
                {["Terms", "Privacy", "Licensing", "DMCA"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      color="inherit"
                      underline="hover"
                      sx={{ display: "block" }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </Stack>
            </Box>

            {/* Social Media */}
            <Box sx={{ minWidth: "200px" }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#f1c40f" }}
              >
                Connect With Us
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <IconButton aria-label="Facebook" sx={{ color: "#ecf0f1" }}>
                  <Facebook />
                </IconButton>
                <IconButton aria-label="Instagram" sx={{ color: "#ecf0f1" }}>
                  <Instagram />
                </IconButton>
                <IconButton aria-label="Twitter" sx={{ color: "#ecf0f1" }}>
                  <Twitter />
                </IconButton>
                <IconButton aria-label="Pinterest" sx={{ color: "#ecf0f1" }}>
                  <Pinterest />
                </IconButton>
              </Stack>
              <Typography variant="body2">
                Subscribe to our newsletter for the latest updates and featured
                galleries.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Box
          sx={{
            pt: 4,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            textAlign: "center",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Pixels Gallery. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
