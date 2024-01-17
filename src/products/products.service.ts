import { Injectable, ConflictException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class ProductsService {
    constructor(private prismaService: PrismaService) { }

    public getAll(): Promise<Product[]> {
        return this.prismaService.product.findMany();
    }

    public getById(id: Product['id']): Promise<Product | null> {
        return this.prismaService.product.findUnique({
            where: { id },
        });
    }

    public async create(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
        try {
            return await this.prismaService.product.create({
                data: productData,
            });
        } catch (error) {
            if (error.code === 'P2002')
                throw new ConflictException('Name is already taken');
            throw error;
        }
    }

    public async updateById(
        id: Product['id'],
        productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
    ): Promise<Product> {
        try {
            return await this.prismaService.product.update({
                where: { id },
                data: productData,
            });
        } catch (error) {
            if (error.code === 'P2002')
                throw new ConflictException('Name is already taken');
            throw error;
        }
    }

    public deleteById(id: Product['id']): Promise<Product> {
        return this.prismaService.product.delete({
            where: { id },
        });
    }
}
