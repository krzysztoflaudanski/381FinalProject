import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    register(registrationData: RegisterDTO): Promise<{
        id: string;
        login: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    validateUser(login: string, password: string): Promise<{
        id: string;
        login: string;
        role: import(".prisma/client").$Enums.Role;
        client: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            address: string;
            userId: string;
        };
    }>;
    createSession(user: any): Promise<{
        access_token: string;
    }>;
}
