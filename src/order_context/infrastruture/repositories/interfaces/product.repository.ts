import Product from 'src/order_context/domain/product';

export default interface ProductRepository {
  getProduct(productId: string): Promise<Product>;
}
