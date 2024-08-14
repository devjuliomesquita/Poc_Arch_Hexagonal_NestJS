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

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [
    // Repositories
    {
      provide: COUPON_REPOSITORY,
      useClass: CouponRepositoryImpl,
    },
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepositoryImpl,
    },
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepositoryImpl,
    },
    // Adapters
    {
      provide: CONNECTION_ADAPTER,
      useClass: ConnectionAdapterImpl,
    },
    // Usecases
    {
      provide: CHECKOUT,
      useClass: CheckoutImpl,
    },
    {
      provide: GET_ORDER,
      useClass: GetOrderImpl,
    },
  ],
})
export class AppModule {}
