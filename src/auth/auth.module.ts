import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/shared/entities/userEntity";
import jwtConfig from "./config/jwt.config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        jwtConfig,
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService],
    exports: [AuthService, UserService],
})
export class AuthModule {}