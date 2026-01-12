export function resolveImageUrl(imageKey?: string) {
  if (!imageKey) return "";
  return `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${imageKey}`;
}
