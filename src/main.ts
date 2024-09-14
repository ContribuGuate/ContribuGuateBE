import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { ExceptionsLoggerFilter } from './tools/error.filter';

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

  app.setGlobalPrefix('/api/contribuguate/v1');
  
  const options: SwaggerCustomOptions = {
    customSiteTitle: 'Contribuguate API',
    useGlobalPrefix: true
  }
  SwaggerModule.setup('api', app, document, options);


  app.enableCors();
  
  app.useGlobalPipes(new ValidationPipe());
  // app.use(helmet());

  const configService = new ConfigService();
  const port = process.env.PORT || configService.getOrThrow<number>('APP_PORT', 3000);

  app.useGlobalFilters(new ExceptionsLoggerFilter());

  await app.listen(port)
  .then(() => {
    Logger.log(`Server running on port ${port}`, "Http - Application");
  })
  .catch((err) => {
    Logger.error(err, "Http - Application");
  })

}
bootstrap();
