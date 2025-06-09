"use client";
import React from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(255,255,255,0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.2, 0.9, 1.2, 0.9, 1] }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        style={{
          width: 68,
          height: 68,
          border: "8px solid var(--accent)",
          borderTop: "4px solid var(--primary)",
          borderRadius: "50%",
          boxShadow: "0 0 20px rgba(249, 249, 31, 0.1)",
        }}
      />
    </div>
  );
}
