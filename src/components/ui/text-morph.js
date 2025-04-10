'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function TextMorph({ children, className, ...props }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn('inline-block text-center', className)}
      {...props}
    >
      {children}
    </motion.span>
  );
} 