import Product from 'src/order_context/domain/product';

export const PRODUCT_REPOSITORY = Symbol('ProductRepository');
export default interface ProductRepository {
  getProduct(productId: string): Promise<Product>;
}
