import { PrismaService } from 'src/prisma/prisma.service';
import { Order } from '@prisma/client';
export declare class OrdersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAll(): Promise<Order[]>;
    getById(id: Order['id']): Promise<Order | null>;
    deleteById(id: Order['id']): Promise<Order>;
    create(orderData: {
        clientId: string;
        products: {
            productId: string;
            quantity: number;
            comment?: string;
        }[];
    }): Promise<Order>;
}
