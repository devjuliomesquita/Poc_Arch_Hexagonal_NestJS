import Coupon from 'src/order_context/domain/coupon';

export default interface CouponRepository {
  getCoupon(code: string): Promise<Coupon>;
}
