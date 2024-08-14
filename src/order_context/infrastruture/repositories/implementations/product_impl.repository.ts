import Product from 'src/order_context/domain/product';
import ProductRepository from '../interfaces/product.repository';
import { Injectable } from '@nestjs/common';
import ConnectionAdapter from '../../adapters/interfaces/connection.adapter';

@Injectable()
export default class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly connection: ConnectionAdapter) {}
  async getProduct(productId: string): Promise<Product> {
    const [productData] = await this.connection.query(
      'select * from tb_products p where(p.product_id = $1)',
      [productId],
    );
    await this.connection.close();
    return new Product(
      productData.product_id,
      productData.description,
      parseFloat(productData.price),
    );
  }
}
