import { BadRequestException, Injectable } from '@nestjs/common';
import { SortProductsDto } from './dto/sort-products.dto';
import { ProductSalesDto } from './dto/create-product-sales.dto';

@Injectable()
export class ProductsService {
  sort(sortProductDto: SortProductsDto) {
    if (sortProductDto.salesWeight + sortProductDto.stockWeight !== 1) {
      throw new BadRequestException(
        'The sum of sales and stock weights must be equal to 1',
      );
    }

    return this.doSomeDataScienceToOrderProductsBasedOnWeights(sortProductDto);
  }

  private doSomeDataScienceToOrderProductsBasedOnWeights(
    sortProductDto: SortProductsDto,
  ) {
    const result: {
      [productId: string]: {
        productId: string;
        sales: number;
        stock: number;
        priority: number;
      };
    } = {};

    // sales
    sortProductDto.productSales.forEach((item: ProductSalesDto) => {
      if (!result[item.productId]) {
        result[item.productId] = {
          productId: item.productId,
          sales: 0,
          stock: 0,
          priority: 0,
        };
      }
      result[item.productId].sales += item.sales;
    });

    // stock
    sortProductDto.productStock.forEach((item) => {
      if (!result[item.productId]) {
        result[item.productId] = {
          productId: item.productId,
          sales: 0,
          stock: 0,
          priority: 0,
        };
      }
      result[item.productId].stock += item.stock;
    });

    //calculate priority for each item

    Object.values(result).forEach((item) => {
      item.priority =
        sortProductDto.salesWeight * item.sales +
        sortProductDto.stockWeight * item.stock;
    });

    //order the resulting array of items with sales, stock and priority
    return Object.values(result)
      .sort((a, b) => b.priority - a.priority)
      .map((element) => element.productId);
    //comment the last map to have full detail
  }
}
