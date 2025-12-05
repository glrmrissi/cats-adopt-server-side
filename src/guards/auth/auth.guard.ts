import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../decorators/is-public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly logger: Logger,
    private readonly reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      this.logger.warn('Rota pública acessada, sem necessidade de autenticação.');
      return true; 
    }

    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request); 
  }

  validateRequest(request: any): boolean {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return false; // Sem token
    }
    const token = authHeader.split(' ')[1];
    // Lógica de validação do token (exemplo simples)
    return token === 'valid-token'; // Substitua pela sua lógica real
  }
} 