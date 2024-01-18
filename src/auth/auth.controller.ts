import { Controller, Body, Post, Request, UseGuards, Response, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dtos/create-user.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register') 
    create(@Body() authData: RegisterDTO) {
        return this.authService.register(authData);
    }

}
