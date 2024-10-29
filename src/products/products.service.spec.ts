import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { SortProductsDto } from './dto/sort-products.dto';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an order list of product ids', () => {
    const rawJson: SortProductsDto = {
      salesWeight: 0.6,
      stockWeight: 0.4,
      productSales: [
        { productId: '1', sales: 50000 },
        { productId: '2', sales: 100000 },
        { productId: '3', sales: 100000 },
        { productId: '4', sales: 75000 },
        { productId: '1', sales: 50000 },
        { productId: '2', sales: 100000 },
        { productId: '3', sales: 100000 },
        { productId: '4', sales: 75000 },
      ],
      productStock: [
        { productId: '1', stock: 100 },
        { productId: '2', stock: 4000 },
        { productId: '3', stock: 200 },
        { productId: '4', stock: 3000 },
        { productId: '1', stock: 100 },
        { productId: '2', stock: 400 },
        { productId: '3', stock: 200 },
        { productId: '4', stock: 300 },
      ],
    };
    const result = service.sort(rawJson);

    const expectedResult = ['2', '3', '4', '1'];

    expect(result).toEqual(expectedResult);
  });
});
