import { AppController } from './app.controller';
import { AuthGuard } from './guards/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from './login/login.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '6h' }, 
    }),
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
    LoginModule
  ],
  controllers: [AppController],
  providers: [
    { 
      provide: APP_GUARD,
      useClass: AuthGuard, 
    },
    AppService,
    Logger
  ],
})
export class AppModule { }