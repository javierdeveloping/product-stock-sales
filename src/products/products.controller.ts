import { Body, Controller, Post } from '@nestjs/common';
import { SortProductsDto } from './dto/sort-products.dto';
import { ProductsService } from './products.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { APPLICATION_API_TAGS } from '../swagger.config';
import { ProductSalesDto } from './dto/create-product-sales.dto';

@ApiTags(APPLICATION_API_TAGS.PRODUCTS)
@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: 'Insert a list of sales weight, stock weight and products',
    description:
      'This endpoint returns an ordered list of product ids based on weights and stock and sales data',
  })
  @ApiResponse({
    status: 200,
    description: 'Ordered list of products',
    type: ProductSalesDto['productId'],
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('sort-products')
  sort(@Body() sortProductsDto: SortProductsDto) {
    return this.productsService.sort(sortProductsDto);
  }
}
