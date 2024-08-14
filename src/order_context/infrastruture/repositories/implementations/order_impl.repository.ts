import Order from 'src/order_context/domain/order';
import OrderRepository from '../interfaces/order.repository';
import { Injectable } from '@nestjs/common';
import ConnectionAdapter from '../../adapters/interfaces/connection.adapter';
import Email from 'src/order_context/domain/email';
import Item from 'src/order_context/domain/item';
import Coupon from 'src/order_context/domain/coupon';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly connection: ConnectionAdapter) {}
  async saveOrder(order: Order): Promise<void> {
    await this.connection.connect();
    await this.connection.startTransaction();
    try {
      await this.connection.query(
        'insert into tb_orders (order_id, order_coupon_code, order_email, order_total) values ($1,$2,$3,$4)',
        [
          order.orderId,
          order.coupon?.code,
          order.email.value,
          order.getTotal(),
        ],
      );
      for (const item of order.itens) {
        await this.connection.query(
          'insert into tb_itens (item_id, item_product_id, item_order_id, item_price, item_quantity) values ($1,$2,$3,$4,$5)',
          [
            crypto.randomUUID(),
            item.productId,
            item.orderId,
            item.price,
            item.quantity,
          ],
        );
      }
      await this.connection.commitTransaction();
    } catch (error) {
      console.log(error);
      await this.connection.rollbackTransaction();
    } finally {
      await this.connection.release();
    }
  }
  async getOrder(orderId: string): Promise<Order> {
    await this.connection.connect();
    const [orderData] = await this.connection.query(
      'select * from tb_orders o where(o.order_id = $1)',
      [orderId],
    );

    const itensData = await this.connection.query(
      'select * from tb_itens i where(i.item_order_id = $1)',
      [orderId],
    );

    const [couponData] = await this.connection.query(
      'select * from tb_coupons c where(c.coupon_code = $1)',
      [orderData.order_coupon_code],
    );
    await this.connection.release();

    const order: Order = new Order(
      orderData.order_id,
      new Email(orderData.order_email),
    );
    const itens = [];
    for (const itemData of itensData) {
      const item: Item = new Item(
        itemData.item_product_id,
        parseFloat(itemData.item_price),
        itemData.item_quantity,
        itemData.item_order_id,
      );
      itens.push(item);
    }
    order.itens = itens;
    if (couponData) {
      const coupon: Coupon = new Coupon(
        couponData.coupon_code,
        parseFloat(couponData.coupon_percentege),
        couponData.coupon_expire_date,
      );
      order.coupon = coupon;
    }
    return order;
  }
}
