import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class CreateLoginDto {
    @ApiProperty(
        {
            description: 'ID do usuário',
            example: 1,
        })
    @PrimaryGeneratedColumn()
    id: number;

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
    @Exclude({ toPlainOnly: true })
    @Column()
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

    @ApiProperty(
        {
            description: 'Indica se o usuário foi deletado',
            example: false,
        })
    @IsBoolean()
    isDeleted: boolean;

    @ApiProperty(
        {
            description: 'Indica se o email do usuário foi verificado',
            example: true,
        })
    @IsBoolean()
    emailVerified: boolean;

    @ApiProperty(
        {
            description: 'Data de deleção do usuário',
            example: '2024-01-01T00:00:00Z',
        })
    @IsDate()
    deleted_at: Date;

    @ApiProperty(
        {
            description: 'Data de criação do usuário',
            example: '2024-01-01T00:00:00Z',
        })
    @IsDate()
    created_at: Date;

    @ApiProperty(
        {
            description: 'Data de atualização do usuário',
            example: '2024-01-01T00:00:00Z',
        })
    @IsDate()
    updated_at: Date;
}