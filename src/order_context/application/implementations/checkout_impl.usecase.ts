import { Injectable } from '@nestjs/common';
import Checkout from '../interfaces/checkout.usecase';
import InputCheckoutDTO from '../dtos/input_checkout.dto';
import OrderRepository from 'src/order_context/infrastruture/repositories/interfaces/order.repository';
import CouponRepository from 'src/order_context/infrastruture/repositories/interfaces/coupon.repository';
import ProductRepository from 'src/order_context/infrastruture/repositories/interfaces/product.repository';
import Order from 'src/order_context/domain/order';
import Product from 'src/order_context/domain/product';
import Coupon from 'src/order_context/domain/coupon';

@Injectable()
export class CheckoutImpl implements Checkout {
  constructor(
    private readonly orderRespository: OrderRepository,
    private readonly couponRepository: CouponRepository,
    private readonly productRepository: ProductRepository,
  ) {}
  async execute(input: InputCheckoutDTO): Promise<string> {
    const order: Order = Order.create(input.email);
    for (const item of input.itens) {
      const product: Product = await this.productRepository.getProduct(
        item.productId,
      );
      order.addItem(product, item.quantity);
    }
    if (input.code) {
      const coupon: Coupon = await this.couponRepository.getCoupon(input.code);
      order.applyCoupon(coupon);
    }
    await this.orderRespository.saveOrder(order);
    return order.orderId;
  }
}
