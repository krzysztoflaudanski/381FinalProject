import { Controller, Get, Param, Delete, Post, Put, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { CreateOrderDTO } from './dtos/create-order.dto';
//import { UpdateOrderDTO } from './dtos/update-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @Get('/')
    @UseGuards(AdminAuthGuard)
    @UseGuards(JwtAuthGuard)
    getAll(): any {
        return this.ordersService.getAll();
    }

    @Get('/:id')
    @UseGuards(AdminAuthGuard)
    @UseGuards(JwtAuthGuard)
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const order = await this.ordersService.getById(id);
        if (!order) throw new NotFoundException('Order not found');
        return order;
    }

    @Delete('/:id')
    @UseGuards(AdminAuthGuard)
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
        console.log(orderData)
        return this.ordersService.create(orderData);
       
    }
}