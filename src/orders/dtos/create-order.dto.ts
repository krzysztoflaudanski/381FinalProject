

  import { IsArray, IsNotEmpty, IsString, IsUUID, ArrayMinSize, ArrayMaxSize, Min, IsNumber, IsOptional } from 'class-validator';

class ProductDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @Min(1)
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  comment?: string;
}

export class CreateOrderDTO {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10) // Ustaw maksymalny rozmiar tablicy, aby uniknąć przeciążenia serwera
  products: ProductDTO[];

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  clientId: string;
}