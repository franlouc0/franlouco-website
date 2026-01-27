import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Extract YouTube video ID from watch or short URL. */
export function getYouTubeVideoId(url: string): string {
  if (url.includes("youtube.com/watch?v=")) {
    return url.split("v=")[1]?.split("&")[0] ?? ""
  }
  if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1]?.split("?")[0] ?? ""
  }
  return ""
}
