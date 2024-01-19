import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { RegisterDTO } from './dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService,) { }

    public async register(registrationData: RegisterDTO) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        const clientData = {
            email: registrationData.email,
            firstName: registrationData.firstName,
            lastName: registrationData.lastName,
            address: registrationData.address,
        }
        const userData = {
            login: registrationData.login,
        };
        return await this.usersService.create(userData, hashedPassword, clientData.email, clientData.firstName, clientData.lastName, clientData.address);
    }

    public async validateUser(login: string, password: string) {
        const user = await this.usersService.getByLogin(login);
        if (user && (await bcrypt.compare(password, user.password.hashedPassword))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    public async createSession(user: any) {
        const payload = { login: user.login, sub: user.id };

        const accessToken = this.jwtService.sign(payload, {
            secret: 'xrwe4543534',
            expiresIn: '12h',
        });

        return {
            access_token: accessToken,
        };
    }
}
