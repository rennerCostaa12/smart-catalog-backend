import dotenv from 'dotenv';

dotenv.config();

const getEnv = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;

  if (!value) {
    throw new Error(`Variáveis de ambiente "${key}" é obrigatória.`);
  }

  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
  database: {
    host: getEnv('DB_HOST', 'localhost'),
    port: Number(process.env.DB_PORT ?? 3306),
    name: getEnv('DB_NAME', 'boilerplate_nodejs'),
    user: getEnv('DB_USER', 'root'),
    password: getEnv('DB_PASSWORD', 'root')
  },
  auth: {
    secret: getEnv('AUTH_SECRET', 'development-auth-secret')
  },
  asaas: {
    baseUrl: getEnv('ASAAS_BASE_URL'),
    apiKey: getEnv('ASAAS_API_KEY')
  }
};
