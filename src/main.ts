import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://192.168.0.9:3000',
      'https://meusite.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization, UserId',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Documentação da API Todolist')
    .setDescription(
      'A API To-Do List permite gerenciar tarefas com operações CRUD (criação, leitura, atualização e exclusão). Os usuários podem adicionar, editar, listar e remover tarefas de forma simples e eficiente',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
