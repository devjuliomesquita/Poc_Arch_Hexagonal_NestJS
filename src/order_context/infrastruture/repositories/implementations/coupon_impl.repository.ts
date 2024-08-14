import Coupon from 'src/order_context/domain/coupon';
import CouponRepository from '../interfaces/coupon.repository';
import { Injectable } from '@nestjs/common';
import ConnectionAdapter from '../../adapters/interfaces/connection.adapter';

@Injectable()
export class CouponRepositoryImpl implements CouponRepository {
  constructor(private readonly connection: ConnectionAdapter) {}
  async getCoupon(code: string): Promise<Coupon> {
    await this.connection.connect();
    await this.connection.startTransaction();
    try {
      const [couponData] = await this.connection.query(
        'select * from tb_coupons c where(c.coupon_code = $1)',
        [code],
      );
      await this.connection.commitTransaction();
      return new Coupon(
        couponData.code,
        parseFloat(couponData.percentage),
        couponData.expire_date,
      );
    } catch (error) {
      console.log(error);
      await this.connection.rollbackTransaction();
    } finally {
      await this.connection.release();
    }
  }
}
