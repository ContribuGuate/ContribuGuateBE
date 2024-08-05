import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Contribuguate API')
  .setDescription('Contribuguate API para voluntarios y colectivos')
  .setVersion('1.0')
  .setLicense('MIT', 'https://github.com/emiliohernandezdev/contribuguate/blob/master/LICENSE')
  .setContact('Emilio Hernandez', 'https://github.com/emiliohernandezdev', 's5wXG@example.com')
  .build();

  const document = SwaggerModule.createDocument(app, config);

  const options: SwaggerCustomOptions = {
    customSiteTitle: 'Contribuguate API'
  }
  SwaggerModule.setup('api', app, document, options);


  app.enableCors();
  app.setGlobalPrefix('/api/contribuguate/v1');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
