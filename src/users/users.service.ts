import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Client, Password, User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) { }

    public getAll(): Promise<User[]> {
        return this.prismaService.user.findMany({ include: { client: true } });
    }

    public getById(id: User['id']): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: { id },
            include: { client: true }
        });
    }

    public getByLogin(login: User['login']): Promise<(User & { password: Password, client: Client }) | null> {
        return this.prismaService.user.findUnique({
            where: { login },
            include: { password: true, client: true }
        });
    }

    public async create(userData: Omit<User, 'id' | 'role'>, password: Password['hashedPassword'],
        email: Client['email'], firstName: Client['firstName'], lastName: Client['lastName'], address: Client['address']): Promise<User> {
        try {
            return await this.prismaService.user.create({
                data: {
                    ...userData,
                    password: {
                        create: {
                            hashedPassword: password,
                        },
                    },
                    client: {
                        create: {
                            email: email,
                            firstName: firstName,
                            lastName: lastName,
                            address: address,
                        }
                    }
                },
            });
        } catch (error) {
            if (error.code === 'P2002') {
                if (error.meta?.target?.includes('login')) {
                    throw new ConflictException('This login is already exist');
                } else if (error.meta?.target?.includes('email')) {
                    throw new ConflictException('This email is already exist');
                }
            }
            throw error;
        }
    }

    public async updateById(
        userId: User['id'],
        userData: Omit<User, 'id' | 'role'>,
        password: string | undefined
    ): Promise<User> {
        try {
            if (password !== undefined) {
                return await this.prismaService.user.update({
                    where: { id: userId },
                    data: {
                        ...userData,
                        password: {
                            update: {
                                hashedPassword: password,
                            },
                        },
                    },
                });
            }
            if (password === undefined) {
                return await this.prismaService.user.update({
                    where: { id: userId },
                    data: userData,
                });
            }

        } catch (error) {
            if (error.code === 'P2002')
                throw new ConflictException("This email is already exist");
            throw error;
        }
    }

    public deleteById(id: User['id']): Promise<User> {
        return this.prismaService.user.delete({
            where: { id },
        });
    }
}