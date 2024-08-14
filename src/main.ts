import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './order_context/infrastruture/configuration/data_source';
import GlobalExceptionFilter from './order_context/shared/exceptions/global/global.exceptions';

async function bootstrap() {
  await dataSource
    .initialize()
    .then(async () => {
      console.log('Data Source has been initialized!');
    })
    .catch((error) => console.log(error));
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapterHost));
  await app.listen(3000);
}
bootstrap();
