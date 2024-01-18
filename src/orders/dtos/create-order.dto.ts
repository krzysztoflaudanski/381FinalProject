import {
    IsNotEmpty,
    IsString,
    Length,
    IsUUID
} from 'class-validator';

export class CreateOrderDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    productId: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    clientId: string;

}