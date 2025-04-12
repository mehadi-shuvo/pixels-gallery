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
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#2E4C3E",
        boxShadow: "none",
        borderBottom: "1px solid #A4B494",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo - shows on all screens */}
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              mr: 2,
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "#F8F4E9",
              textDecoration: "none",
              flexGrow: { xs: 1, md: 0 },
              "&:hover": {
                color: "#D17B60",
              },
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
              sx={{ color: "#F8F4E9" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="mobile-menu"
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleCloseMobileMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  backgroundColor: "#F8F4E9",
                },
              }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.name}
                  onClick={handleCloseMobileMenu}
                  component={Link}
                  href={item.path}
                  selected={pathname === item.path}
                  sx={{
                    color: "#2E4C3E",
                    "&.Mui-selected": {
                      backgroundColor: "#A4B494",
                      color: "#F8F4E9",
                    },
                    "&:hover": {
                      backgroundColor: "#A4B49480",
                    },
                  }}
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
              gap: 2,
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
                  color: "#F8F4E9",
                  backgroundColor:
                    pathname === item.path ? "#A4B494" : "transparent",
                  borderRadius: "4px",
                  px: 2,
                  py: 1,
                  "&:hover": {
                    backgroundColor: "#A4B49480",
                    color: "#F8F4E9",
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
