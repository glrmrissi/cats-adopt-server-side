import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { CreateLoginDto } from '../dto/create-login.dto';

export function ApiCreateLoginDocs() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Cria um novo usuário',
      description: 'Rota responsável por registrar novos usuários no sistema...'
    }),
    ApiResponse({ 
      status: 201, 
      description: 'Usuário criado com sucesso.', 
      type: CreateLoginDto 
    }),
    ApiBadRequestResponse({ 
      description: 'Dados inválidos ou email já existente.' 
    }),
  );
}

export function ApiLoginDocs() {
    return applyDecorators(
        ApiOperation({
            summary: 'Login de usuário',
            description: 'Rota responsável por autenticar usuários e fornecer tokens de acesso...'
        }),
        ApiResponse({
            status: 200,
            description: 'Login realizado com sucesso.',
            schema: {
                example: {
                    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            }
        }),
        ApiBadRequestResponse({
            description: 'Credenciais inválidas.'
        }),
    );
}