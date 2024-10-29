import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductSalesDto } from './create-product-sales.dto';
import { ProductStockDto } from './create-product-stock.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SortProductsDto {
  @ApiProperty({
    description: 'Weight of sales',
    nullable: false,
    minimum: 0,
    example: 0.4,
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  salesWeight: number;

  @ApiProperty({
    description: 'Weight of stock',
    nullable: false,
    minimum: 0,
    example: 0.6,
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  stockWeight: number;

  @ApiProperty({
    description: 'List of products and their sales',
    nullable: false,
    isArray: true,
    type: ProductSalesDto,
    example: `[
      {"productId": "1", "sales": 50000},
      {"productId": "2", "sales": 100000},
      {"productId": "3", "sales": 100000},
      {"productId": "4", "sales": 75000},
      {"productId": "1", "sales": 50000},
      {"productId": "2", "sales": 100000},
      {"productId": "3", "sales": 100000},
      {"productId": "4", "sales": 75000}
    ]`,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductSalesDto)
  productSales: ProductSalesDto[];

  @ApiProperty({
    description: 'List of products and their stock',
    nullable: false,
    isArray: true,
    type: ProductStockDto,
    example: `[
    {"productId": "1", "stock": 100},
    {"productId": "2", "stock": 4000},
    {"productId": "3", "stock": 200},
    {"productId": "4", "stock": 3000},  
    {"productId": "1", "stock": 100},
    {"productId": "2", "stock": 400},
    {"productId": "3", "stock": 200},
    {"productId": "4", "stock": 300}
  ]`,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductStockDto)
  productStock: ProductStockDto[];
}
