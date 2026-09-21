import { createSocialImage, socialImageSize } from "@/lib/seo/social-image";

export const alt = "Zenticsys automotive digital systems";
export const size = socialImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSocialImage();
}
