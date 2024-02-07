import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    getAll(): any;
    getById(id: string): Promise<{
        id: string;
        clientId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteById(id: string): Promise<{
        success: boolean;
    }>;
    create(orderData: CreateOrderDTO): Promise<{
        id: string;
        clientId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
