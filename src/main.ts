import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './order_context/infrastruture/configuration/data_source';

async function bootstrap() {
  await dataSource
    .initialize()
    .then(async () => {
      console.log('Data Source has been initialized!');
    })
    .catch((error) => console.log(error));
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
