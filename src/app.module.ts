import { AppController } from './app.controller';
import { AuthGuard } from './auth/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      entities: ['dist/shared/entities/*.{ts,js}'],
      synchronize: false,
    }),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    { 
      provide: APP_GUARD,
      useClass: AuthGuard, 
    },
    AppService,
    Logger,
    AuthService
  ],
})
export class AppModule { }