import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAll(): any;
    getById(id: string): Promise<{
        id: string;
        login: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
