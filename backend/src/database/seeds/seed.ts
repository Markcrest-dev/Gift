import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module.js';
import { GiftSeedService } from './gift-seed.service.js';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);
  const seedService = app.get(GiftSeedService);
  await seedService.seed();
  await app.close();
}

bootstrap().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
