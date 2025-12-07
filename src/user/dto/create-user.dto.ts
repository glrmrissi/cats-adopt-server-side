import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {

    @ApiProperty(
        {
            description: 'Nome de usuário',
            example: 'usuario123',
        })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty(
        {
            description: 'Senha do usuário',
            example: 'senhaSegura!@#',
        })
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword(
        {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }
    )
    password: string;

    @ApiProperty(
        {
            description: 'Email do usuário',
            example: 'usuario@example.com',
        })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}
