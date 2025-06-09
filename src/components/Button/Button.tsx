"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./Button.module.css";

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof motion.button> {
  variant?: "primary" | "secondary" | "success" | "danger";
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={[
        styles.button,
        styles[variant],
        variant === "primary" ? styles.primary : "",
        variant === "secondary" ? styles.secondary : "",
        variant === "success" ? styles.success : "",
        variant === "danger" ? styles.danger : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </motion.button>
  );
}
