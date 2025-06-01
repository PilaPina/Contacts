'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(255,255,255,0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        style={{
          width: 48,
          height: 48,
          border: '4px solid #e0e7ef',
          borderTop: '4px solid var(--primary)',
          borderRadius: '50%',
        }}
      />
    </div>
  );
}