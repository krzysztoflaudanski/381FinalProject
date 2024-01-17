import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class UpdateProductDTO {
    @IsNotEmpty()
    @IsString()
    @Length(10, 20)
    name: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    price: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
    photos: string;
}