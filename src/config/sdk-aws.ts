import { S3 } from "@aws-sdk/client-s3";
import { env } from "./env";

export const clientAWS = new S3({
  region: env.aws.region,
  endpoint: env.aws.endpoint,
  forcePathStyle: env.aws.forcePathStyle,
  credentials: {
    accessKeyId: env.aws.accessKey,
    secretAccessKey: env.aws.secretKey,
  },
});
