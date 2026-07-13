import dotenv from "dotenv";

dotenv.config();

const getEnv = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;

  if (!value) {
    throw new Error(`Variáveis de ambiente "${key}" é obrigatória.`);
  }

  return value;
};

const getOptionalEnv = (key: string): string | undefined => {
  const value = process.env[key];

  return value?.trim() || undefined;
};

const getBooleanEnv = (key: string, fallback = false): boolean => {
  const value = getOptionalEnv(key);

  if (!value) {
    return fallback;
  }

  return ["1", "true", "yes"].includes(value.toLowerCase());
};

const awsEndpoint = getOptionalEnv("AWS_ENDPOINT");

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 3000),
  database: {
    host: getEnv("DB_HOST", "localhost"),
    port: Number(process.env.DB_PORT ?? 3306),
    name: getEnv("DB_NAME", "boilerplate_nodejs"),
    user: getEnv("DB_USER", "root"),
    password: getEnv("DB_PASSWORD", "root"),
  },
  auth: {
    secret: getEnv("AUTH_SECRET", "development-auth-secret"),
  },
  asaas: {
    baseUrl: getEnv("ASAAS_BASE_URL"),
    apiKey: getEnv("ASAAS_API_KEY"),
  },
  aws: {
    accessKey: getEnv("AWS_ACCESS_KEY"),
    secretKey: getEnv("AWS_SECRET_KEY"),
    region: getEnv("AWS_REGION"),
    bucket: getEnv("AWS_BUCKET"),
    endpoint: awsEndpoint,
    publicUrl: getOptionalEnv("AWS_PUBLIC_URL"),
    forcePathStyle: getBooleanEnv("AWS_FORCE_PATH_STYLE", Boolean(awsEndpoint)),
  },
};
