import Order from 'src/order_context/domain/order';

export default interface OrderRepository {
  saveOrder(order: Order): Promise<void>;
  getOrder(orderId: string): Promise<Order>;
}
