import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { RegisterDTO } from './dtos/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

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
}
