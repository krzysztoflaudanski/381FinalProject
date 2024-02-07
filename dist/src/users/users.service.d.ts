import { PrismaService } from 'src/prisma/prisma.service';
import { Client, Password, User } from '@prisma/client';
export declare class UsersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAll(): Promise<User[]>;
    getById(id: User['id']): Promise<User | null>;
    getByLogin(login: User['login']): Promise<(User & {
        password: Password;
        client: Client;
    }) | null>;
    create(userData: Omit<User, 'id' | 'role'>, password: Password['hashedPassword'], email: Client['email'], firstName: Client['firstName'], lastName: Client['lastName'], address: Client['address']): Promise<User>;
    updateById(userId: User['id'], userData: Omit<User, 'id' | 'role'>, password: string | undefined): Promise<User>;
    deleteById(id: User['id']): Promise<User>;
}
