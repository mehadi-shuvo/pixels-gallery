"use client";

import React from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/footer/Footer";

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
      {children}
      <Footer />
    </>
  );
}
