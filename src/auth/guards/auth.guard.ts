import { Injectable, CanActivate, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../decorators/is-public.decorator';
import { AuthService } from '../auth.service';
import { PayloadJwt } from '../types/typePayloadJwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly logger: Logger,
    private readonly reflector: Reflector,
    private readonly authService: AuthService
  ) { }

  async validateRequest(request: any): Promise<PayloadJwt | null> {
    const authHeader = request.headers['x_access_token'];

    if (!authHeader) {
      return null;
    }

    const token = authHeader.toString();

    try {
      return await this.authService.validateJwtToken(token);
    } catch (e) {
      this.logger.error('Erro ao validar token JWT', e);
      return null;
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const result = await this.validateRequest(request);

    if (result) {
      request.user = { id: result.sub };
      return true;
    }

    throw new UnauthorizedException('Token inválido ou ausente.');
  }
}