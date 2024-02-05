import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
    constructor(private prismaService: PrismaService) { }

    public getAll(): Promise<Order[]> {
        return this.prismaService.order.findMany({ include: { products: { include: { product: true } }, client: true } });
    }

    public getById(id: Order['id']): Promise<Order | null> {
        return this.prismaService.order.findUnique({
            where: { id },
            include: { products: { include: { product: true } }, client: true },
        });
    }

    public deleteById(id: Order['id']): Promise<Order> {
        return this.prismaService.order.delete({
            where: { id },
        });
    }

  // orders.service.ts

    public async create(orderData: { clientId: string; products: { productId: string; quantity: number; comment?: string }[]  }): Promise<Order> {
        const { clientId, products } = orderData;

        try {
            // Tworzymy zamówienie
            const createdOrder = await this.prismaService.order.create({
                data: {
                    client: {
                        connect: { id: clientId },
                    },
                },
            });

            // Dodajemy produkty do zamówienia przy użyciu modelu pośredniczącego ProductToOrder
            for (const { productId, quantity, comment } of products) {
                await this.prismaService.productToOrder.create({
                  data: {
                    product: {
                      connect: { id: productId },
                    },
                    order: {
                      connect: { id: createdOrder.id },
                    },
                    quantity,
                    comment,
                  },
                });
              }

            // Zwracamy utworzone zamówienie
            return createdOrder;
        } catch (error) {
            if (error.code === 'P2025') {
                throw new BadRequestException("Product or client doesn't exist");
            }
            throw error;
        }
    }
}

// public async updateById(
//     id: Order['id'],
//     orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
// ): Promise<Order> {
//     const { productId, clientId } = orderData;
//     try {
//         return await this.prismaService.order.update({
//             where: { id },
//             data: {
//                 client: {
//                     connect: { id: clientId },
//                 },
//                 product: {
//                     connect: { id: productId },
//                 },
//             },
//         });
//     } catch (error) {
//         if (error.code === 'P2025')
//             throw new BadRequestException("Product or clientdoesn't exist");
//         throw error;
//     }
// }
