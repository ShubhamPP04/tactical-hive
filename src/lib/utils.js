/**
 * Utility function to conditionally join class names together
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
} 