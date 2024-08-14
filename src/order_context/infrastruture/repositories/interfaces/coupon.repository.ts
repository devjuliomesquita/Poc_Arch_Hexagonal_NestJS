import Coupon from 'src/order_context/domain/coupon';

export const COUPON_REPOSITORY = Symbol('CouponRepository');
export default interface CouponRepository {
  getCoupon(code: string): Promise<Coupon>;
}
