import { DocumentBuilder } from '@nestjs/swagger';

export enum APPLICATION_API_TAGS {
  PRODUCTS = 'Products',
}

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Product stock and sales')
  .setDescription('Endpoints for product stock and sales demo')
  .setVersion('1.0')
  .build();

export const swaggerTags = [
  {
    name: APPLICATION_API_TAGS.PRODUCTS,
    description: 'Operations related to products stock and sales',
  },
];
