import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v2");//anteponer un nombre a la ruta global
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true, //Sola dja la data q estoy esperando remueve la data q no esta declarada en el dto
    forbidNonWhitelisted: true,// con este pipe global evito que el frontend envie mas data de la que espero y tira error sino envia la que espero
    }))
  await app.listen(3000);
}
bootstrap();
