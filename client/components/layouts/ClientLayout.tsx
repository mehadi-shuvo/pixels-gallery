"use client";

import React from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/footer/Footer";
import { Toaster } from "react-hot-toast";
import { Box } from "@mui/material";

// Dynamically import the navbar with SSR disabled
const ResponsiveAppBar = dynamic(
  () => import("@/components/menu/ResponsiveAppBar"),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: "64px", backgroundColor: "#2E4C3E" }} />
    ),
  }
);

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#F8F4E9",
      }}
    >
      <ResponsiveAppBar />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#2E4C3E",
            color: "#F8F4E9",
            border: "1px solid #A4B494",
          },
          success: {
            iconTheme: {
              primary: "#A4B494",
              secondary: "#2E4C3E",
            },
          },
          error: {
            style: {
              background: "#D17B60",
            },
          },
        }}
      />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
