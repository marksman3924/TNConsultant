/**
 * Generates an optimized Cloudinary URL.
 * @param url The raw Cloudinary URL stored in the map.
 * @param width Optional width to resize.
 */
export function getOptimizedUrl(url: string, width?: number): string {
  if (!url || !url.includes("cloudinary.com")) return url;
  
  // Insert transformation parameters before /v[version]/ or /upload/
  const insertionPoint = "/upload/";
  const [base, file] = url.split(insertionPoint);
  
  if (!file) return url;

  const transforms = ["f_auto", "q_auto"];
  if (width) transforms.push(`w_${width}`);

  return `${base}${insertionPoint}${transforms.join(",")}/${file}`;
}