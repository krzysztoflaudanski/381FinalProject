import { AuthService } from './auth.service';
import { RegisterDTO } from './dtos/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    create(authData: RegisterDTO): Promise<{
        id: string;
        login: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    login(req: any, res: any): Promise<void>;
    logout(res: any): Promise<void>;
}
