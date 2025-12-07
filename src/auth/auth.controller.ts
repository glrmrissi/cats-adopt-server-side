import { Body, Controller, HttpCode, Post, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { IsPublic } from "src/decorators/is-public.decorator";
import { LoginUserDto } from "./dto/login-user.dto";
import { LogInterceptor } from "src/interceptors/log.interceptor";

@UseInterceptors(LogInterceptor)
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    
    @HttpCode(200)
    @IsPublic()
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        const x_access_token = await this.authService.login(loginUserDto);
        return x_access_token ;
    }
}
