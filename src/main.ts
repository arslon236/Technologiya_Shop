import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger konfiguratsiyasi
  const config = new DocumentBuilder()
    .setTitle('Phone Shop API')
    .setDescription('Telefon do‘koni uchun backend API')
    .setVersion('1.0')
    .addTag('Products')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT, () => {
    console.log(`🚀 Server is running at: http://localhost:${PORT}`);
    console.log(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
  });
}
bootstrap();
