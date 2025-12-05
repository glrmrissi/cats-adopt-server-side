import { AppController } from './app.controller';
import { AuthGuard } from './guards/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'cats-adopt',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      autoLoadEntities: true,
      // synchronize: true,
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