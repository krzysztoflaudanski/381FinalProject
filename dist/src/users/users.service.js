"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    getAll() {
        return this.prismaService.user.findMany({ include: { client: true } });
    }
    getById(id) {
        return this.prismaService.user.findUnique({
            where: { id },
            include: { client: true }
        });
    }
    getByLogin(login) {
        return this.prismaService.user.findUnique({
            where: { login },
            include: { password: true, client: true }
        });
    }
    async create(userData, password, email, firstName, lastName, address) {
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
        }
        catch (error) {
            if (error.code === 'P2002') {
                if (error.meta?.target?.includes('login')) {
                    throw new common_1.ConflictException('This login is already exist');
                }
                else if (error.meta?.target?.includes('email')) {
                    throw new common_1.ConflictException('This email is already exist');
                }
            }
            throw error;
        }
    }
    async updateById(userId, userData, password) {
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
        }
        catch (error) {
            if (error.code === 'P2002')
                throw new common_1.ConflictException("This email is already exist");
            throw error;
        }
    }
    deleteById(id) {
        return this.prismaService.user.delete({
            where: { id },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map