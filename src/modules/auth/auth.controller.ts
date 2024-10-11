import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequest } from "./dto/request/login.request";
import { RegisterRequest } from "./dto/request/register.request";
import { RecoverRequest } from "./dto/request/recover.request";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Post('login')
    public async doLogin(@Body() body: LoginRequest){
        return this.authService.doLogin(body);
    }

    @Post('register')
    public async doRegister(@Body() body: RegisterRequest){
        return this.authService.doRegister(body);
    }

    @Post('recover')
    public async recoverPassword(@Body() body: RecoverRequest){
        return this.authService.recoverPassword(body.email);
    }
}