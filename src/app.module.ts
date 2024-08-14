import { Module } from '@nestjs/common';
import OrderController from './order_context/infrastruture/drivers/order.controller';
import { ConnectionAdapterImpl } from './order_context/infrastruture/adapters/implementations';
import { CONNECTION_ADAPTER } from './order_context/infrastruture/adapters/interfaces';
import {
  COUPON_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_REPOSITORY,
} from './order_context/infrastruture/repositories/interfaces';
import {
  CouponRepositoryImpl,
  OrderRepositoryImpl,
  ProductRepositoryImpl,
} from './order_context/infrastruture/repositories/implementations';
import { CHECKOUT, GET_ORDER } from './order_context/application/interfaces';
import {
  CheckoutImpl,
  GetOrderImpl,
} from './order_context/application/implementations';
import ConnectionAdapter from './order_context/infrastruture/adapters/interfaces/connection.adapter';
import OrderRepository from './order_context/infrastruture/repositories/interfaces/order.repository';
import CouponRepository from './order_context/infrastruture/repositories/interfaces/coupon.repository';
import ProductRepository from './order_context/infrastruture/repositories/interfaces/product.repository';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [
    // Repositories
    {
      provide: COUPON_REPOSITORY,
      useFactory: (connection: ConnectionAdapter) => {
        return new CouponRepositoryImpl(connection);
      },
      inject: [CONNECTION_ADAPTER],
    },
    {
      provide: ORDER_REPOSITORY,
      useFactory: (connection: ConnectionAdapter) => {
        return new OrderRepositoryImpl(connection);
      },
      inject: [CONNECTION_ADAPTER],
    },
    {
      provide: PRODUCT_REPOSITORY,
      useFactory: (connection: ConnectionAdapter) => {
        return new ProductRepositoryImpl(connection);
      },
      inject: [CONNECTION_ADAPTER],
    },
    // Adapters
    {
      provide: CONNECTION_ADAPTER,
      useClass: ConnectionAdapterImpl,
    },
    // Usecases
    {
      provide: CHECKOUT,
      useFactory: (
        orderRepository: OrderRepository,
        couponRepository: CouponRepository,
        productRepository: ProductRepository,
      ) => {
        return new CheckoutImpl(
          orderRepository,
          couponRepository,
          productRepository,
        );
      },
      inject: [ORDER_REPOSITORY, COUPON_REPOSITORY, PRODUCT_REPOSITORY],
    },
    {
      provide: GET_ORDER,
      useFactory: (orderRepository: OrderRepository) => {
        return new GetOrderImpl(orderRepository);
      },
      inject: [ORDER_REPOSITORY],
    },
  ],
})
export class AppModule {}
