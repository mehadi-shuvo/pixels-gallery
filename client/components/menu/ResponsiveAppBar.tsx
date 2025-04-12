"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function GalleryNavbar() {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const pathname = usePathname();
  const navItems = [
    { name: "Gallery", path: "/" },
    { name: "Upload", path: "/upload" },
  ];

  const handleOpenMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo - shows on all screens */}
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            Pixels
          </Typography>

          {/* Mobile menu button and menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="mobile-menu"
              onClick={handleOpenMobileMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="mobile-menu"
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleCloseMobileMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.name}
                  onClick={handleCloseMobileMenu}
                  component={Link}
                  href={item.path}
                  selected={pathname === item.path}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop menu items */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              marginLeft: "auto",
              gap: 1,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                href={item.path}
                color="inherit"
                sx={{
                  fontWeight: pathname === item.path ? 700 : 500,
                  textTransform: "none",
                  fontSize: "1rem",
                  backgroundColor:
                    pathname === item.path
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
