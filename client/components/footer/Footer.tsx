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
        backgroundColor: "#2E4C3E",
        color: "#F8F4E9",
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
              sx={{
                fontWeight: "bold",
                color: "#A4B494",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Pixels Gallery
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              Discover and share beautiful nature photography from around the
              world. Our gallery celebrates the beauty of the outdoors and
              eco-conscious artistry.
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
                sx={{
                  fontWeight: "bold",
                  color: "#A4B494",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Explore
              </Typography>
              <Stack
                component="ul"
                sx={{ listStyle: "none", p: 0, m: 0, gap: 1 }}
              >
                {["Landscapes", "Wildlife", "Seasons", "Artists"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        color="inherit"
                        underline="hover"
                        sx={{
                          display: "block",
                          "&:hover": {
                            color: "#D17B60",
                          },
                        }}
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </Stack>
            </Box>

            {/* Legal Links */}
            <Box sx={{ minWidth: "120px" }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#A4B494",
                  fontFamily: "'Montserrat', sans-serif",
                }}
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
                      sx={{
                        display: "block",
                        "&:hover": {
                          color: "#D17B60",
                        },
                      }}
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
                sx={{
                  fontWeight: "bold",
                  color: "#A4B494",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Connect With Us
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <IconButton
                  aria-label="Facebook"
                  sx={{
                    color: "#F8F4E9",
                    "&:hover": { color: "#D17B60" },
                  }}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  aria-label="Instagram"
                  sx={{
                    color: "#F8F4E9",
                    "&:hover": { color: "#D17B60" },
                  }}
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  aria-label="Twitter"
                  sx={{
                    color: "#F8F4E9",
                    "&:hover": { color: "#D17B60" },
                  }}
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  aria-label="Pinterest"
                  sx={{
                    color: "#F8F4E9",
                    "&:hover": { color: "#D17B60" },
                  }}
                >
                  <Pinterest />
                </IconButton>
              </Stack>
              <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                Join our community of nature enthusiasts and receive seasonal
                photography highlights.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Box
          sx={{
            pt: 4,
            borderTop: "1px solid #A4B49480",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "#A4B494" }}>
            {" "}
            {/* Sage Green */}© {new Date().getFullYear()} Pixels Gallery. All
            rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
