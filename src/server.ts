import { app } from './app';
import { initializeDatabase } from './config/database';
import { env } from './config/env';

const bootstrap = async (): Promise<void> => {
  await initializeDatabase();

  app.listen(env.port, () => {
    console.log(`Rodando na porta: ${env.port}`);
  });
};

bootstrap().catch((error: unknown) => {
  console.error('Aplicação falhou na hora de rodar:', error);
  process.exit(1);
});
