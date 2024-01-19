import { Controller, Get, Param, Delete, Post, Put, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @Get('/')
    @UseGuards(JwtAuthGuard)
    getAll(): any {
        return this.ordersService.getAll();
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const order = await this.ordersService.getById(id);
        if (!order) throw new NotFoundException('Order not found');
        return order;
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if (!(await this.ordersService.getById(id)))
            throw new NotFoundException('Order not found');
        await this.ordersService.deleteById(id);
        return { success: true };
    }

    @Post('/')
    @UseGuards(JwtAuthGuard)
    create(@Body() orderData: CreateOrderDTO) {
        return this.ordersService.create(orderData);
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() orderData: UpdateOrderDTO,
    ) {
        if (!(await this.ordersService.getById(id)))
            throw new NotFoundException('Order not found');

        await this.ordersService.updateById(id, orderData);
        return { success: true };
    }
}