/**
 * Resolves an image path to a fully qualified URL.
 *
 * - If the value is already a full URL (Cloudinary or any https/http), returns as-is.
 * - Otherwise, prepends NEXT_PUBLIC_API_URL (legacy uploads still on the backend disk).
 * - Falls back to the provided fallback (or "/img/hotel.jpg") when empty.
 */
export const resolveImageUrl = (
  path?: string | null,
  fallback: string = "/img/hotel.jpg"
): string => {
  if (!path) return fallback;
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/")) return path; // local public asset
  return `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
};
