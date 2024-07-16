import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Allow CORS for all origins
  app.enableCors({
    origin: true, // This will allow all origins
    // credentials: true, // Optional: if your frontend needs to send cookies or authentication information
  });

  const config = new DocumentBuilder()
    .setTitle('DigiCred ACA-Py Controller API')
    .setDescription('Controller for ACA-Py tenants in DigiCred CrMS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('PORT') || 3008;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
