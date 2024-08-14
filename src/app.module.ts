import { Module } from '@nestjs/common';
import CouponRepositoryImpl from './order_context/infrastruture/repositories/implementations/coupon_impl.repository';
import OrderRepositoryImpl from './order_context/infrastruture/repositories/implementations/order_impl.repository';
import ProductRepositoryImpl from './order_context/infrastruture/repositories/implementations/product_impl.repository';
import ConnectionAdapterImpl from './order_context/infrastruture/adapters/implementations/connection_impl.adapter';
import CheckoutImpl from './order_context/application/implementations/checkout_impl.usecase';
import GetOrderImpl from './order_context/application/implementations/get_order_impl.usecase';
import OrderController from './order_context/infrastruture/drivers/order.controller';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [
    // Repositories
    CouponRepositoryImpl,
    OrderRepositoryImpl,
    ProductRepositoryImpl,
    // Adapters
    ConnectionAdapterImpl,
    // Usecases
    CheckoutImpl,
    GetOrderImpl,
  ],
})
export class AppModule {}
