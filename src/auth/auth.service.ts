import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { PayloadJwt } from "./types/typePayloadJwt";
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (user?.password === password) {
            return user.id;
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<{ x_access_token: string }> {
        const userId = await this.validateUser(loginUserDto.email, loginUserDto.password);
        if (!userId) {
            throw new Error('Invalid credentials');
        }
        const payload: PayloadJwt = { sub: userId.toString() };
        const token = this.jwtService.sign(payload);

        return { x_access_token: token };
    }

    async validateJwtToken(token: string): Promise<PayloadJwt> {
        return this.jwtService.verifyAsync<PayloadJwt>(token);
    }
}