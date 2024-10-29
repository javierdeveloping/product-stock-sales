import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class ProductSalesDto {
  @ApiProperty({
    description: 'Product Id',
    nullable: false,
    minLength: 1,
    example: '1',
  })
  @IsString()
  productId: string;

  @ApiProperty({
    description: 'Number of units sold',
    nullable: false,
    minimum: 0,
    example: 100000,
  })
  @Min(0)
  @IsInt()
  sales: number;
}
