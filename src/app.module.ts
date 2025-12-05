import { AppController } from './app.controller';
import { AuthGuard } from './guards/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { Logger, Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';

@Module({
  imports: [LoginModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
    Logger,
  ],
})
export class AppModule { }