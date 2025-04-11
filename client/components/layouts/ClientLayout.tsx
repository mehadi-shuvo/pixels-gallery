"use client";

import React from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/footer/Footer";
import { Toaster } from "react-hot-toast";

// Dynamically import the navbar with SSR disabled
const ResponsiveAppBar = dynamic(
  () => import("@/components/menu/ResponsiveAppBar"),
  {
    ssr: false,
    loading: () => <div style={{ height: "64px" }} />,
  }
);

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ResponsiveAppBar />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      {children}
      <Footer />
    </>
  );
}
