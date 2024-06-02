// import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoDB.js';
import { startServer } from './server.js';

const bootstrap = async () => {
  await initMongoConnection();
  startServer();
};

bootstrap();
