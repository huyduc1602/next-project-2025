// Utility functions
export function clsx(...args: any[]) {
  // Combine class names
  return args.filter(Boolean).join(' ');
}
