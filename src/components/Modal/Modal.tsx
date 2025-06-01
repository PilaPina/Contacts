"use client";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** optional size: "medium" | "large" */
  size?: "medium" | "large";
}

export default function Modal({
  open,
  onClose,
  children,
  size = "medium",
}: ModalProps) {
  // Prevent background scroll while open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Modal dialog"
    >
      <div
        className={`${styles.content} ${
          size === "large" ? styles.large : styles.medium
        }`}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          className={styles.closeBtn}
          aria-label="Close modal"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
