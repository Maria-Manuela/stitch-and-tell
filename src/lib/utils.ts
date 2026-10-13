/**
 * Tiny className helper
 * ---------------------
 * Handles: merging Tailwind classes without conflicts (`cn("p-2", "p-4")`
 *          → `"p-4"`). Used by every UI primitive.
 *
 * Does not handle: theming — tokens live in `globals.css`.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
