import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),  
  ); 
   //SWAGGER API DOCUMENTATION SETUP
   const config = new DocumentBuilder()
   .addBearerAuth()
   .setTitle('TOBAMS API')
   .setDescription('The TOBAMS API description')
   .setVersion('1.0')  
   .addTag('api')
   .build(); 
 const document = SwaggerModule.createDocument(app, config);
  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
