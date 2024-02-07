import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    getAll(): Promise<{
        id: string;
        name: string;
        price: number;
        description: string;
        photos: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        name: string;
        price: number;
        description: string;
        photos: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(productData: CreateProductDTO): Promise<{
        id: string;
        name: string;
        price: number;
        description: string;
        photos: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, productData: UpdateProductDTO): Promise<{
        success: boolean;
    }>;
    deleteById(id: string): Promise<{
        success: boolean;
    }>;
}
