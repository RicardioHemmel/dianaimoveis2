export function resolveImageUrl(imageKey?: string) {
    if(!imageKey) return "";
    return `${process.env.R2_PUBLIC_URL}/${imageKey}`;
}