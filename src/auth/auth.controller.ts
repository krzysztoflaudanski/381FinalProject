import { Controller, Body, Post, Request, UseGuards, Response, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dtos/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register')
    create(@Body() authData: RegisterDTO) {
        return this.authService.register(authData);
    }

    // @UseGuards(LocalAuthGuard)
    // @Post('login')
    // async login(@Request() req, @Response() res) {
    //     const tokens = await this.authService.createSession(req.user);
    //     res.cookie('auth', tokens, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'None' });
    //     res.send({
    //         message: 'success',
    //     });
    // }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Response() res) {
        const tokens = await this.authService.createSession(req.user);
        res.cookie('auth', tokens, { httpOnly: false });
        res.send({
            message: 'success',
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('logout')
    async logout(@Response() res) {
        res.clearCookie('auth', { httpOnly: true });
        res.send({
            message: 'success',
        });
    }
}