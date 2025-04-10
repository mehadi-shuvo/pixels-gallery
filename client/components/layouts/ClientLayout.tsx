"use client";

import React from "react";
import ResponsiveAppBar from "@/components/menu/ResponsiveAppBar";
import Footer from "@/components/footer/Footer";

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
