import { randomUUID } from "crypto";
import { extname } from "path";

import { env } from "../config/env";
import { StorageBucket } from "./storage-bucket";

const PRODUCT_IMAGES_FOLDER = "produtos";

const mimeTypeExtensions: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const getImageExtension = (image: Express.Multer.File): string => {
  const extension = extname(image.originalname).toLowerCase();

  return extension || mimeTypeExtensions[image.mimetype] || "";
};

const getPublicImageUrl = (key: string): string => {
  const encodedKey = key.split("/").map(encodeURIComponent).join("/");
  const baseUrl =
    env.aws.publicUrl ??
    (env.aws.endpoint
      ? `${env.aws.endpoint}/${env.aws.bucket}`
      : `https://${env.aws.bucket}.s3.${env.aws.region}.amazonaws.com`);

  return `${baseUrl.replace(/\/$/, "")}/${encodedKey}`;
};

export const uploadProductImage = async (image: Express.Multer.File) => {
  try {
    const key = `${PRODUCT_IMAGES_FOLDER}/${randomUUID()}${getImageExtension(image)}`;

    await StorageBucket(env.aws.bucket, key, image.buffer, image.mimetype);

    return getPublicImageUrl(key);
  } catch (error) {
    console.error(error);
    return false;
  }
};
