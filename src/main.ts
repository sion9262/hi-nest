import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 데코레이터가 없는 속성 제거
      forbidNonWhitelisted: true, // 데코레이더가 존재하지 않으므로 exception
      transform: true // user가 보낸 것을 원하는 type으로 변경
    })
  );
  await app.listen(3000);
}
bootstrap();
