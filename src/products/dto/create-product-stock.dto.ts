import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class ProductStockDto {
  @ApiProperty({
    description: 'Product Id',
    nullable: false,
    minLength: 1,
    example: '1',
  })
  @IsString()
  productId: string;

  @ApiProperty({
    description: 'Number of units in stock',
    nullable: false,
    minimum: 0,
    example: '500',
  })
  @Min(0)
  @IsInt()
  stock: number;
}
