import { clientAWS } from "../config/sdk-aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function StorageBucket(
  nameBucket: string,
  keyFile: string,
  body: Buffer | Uint8Array | Blob,
  contentType: string,
) {
  const responseBucket = await clientAWS.send(
    new PutObjectCommand({
      Bucket: nameBucket,
      Key: keyFile,
      Body: body,
      ContentType: contentType,
    }),
  );

  return responseBucket;
}
