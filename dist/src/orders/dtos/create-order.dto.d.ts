declare class ProductDTO {
    productId: string;
    quantity: number;
    comment?: string;
}
export declare class CreateOrderDTO {
    products: ProductDTO[];
    clientId: string;
}
export {};
