import RecordBase from '../shared/record_base';
import Coupon from './coupon';
import Email from './email';
import Item from './item';
import Product from './product';

export default class Order extends RecordBase {
  itens: Item[];
  coupon?: Coupon;

  constructor(
    readonly orderId: string,
    readonly email: Email,
  ) {
    super({ orderId, email });
    this.itens = [];
  }

  static create(email: string): Order {
    const orderId: string = crypto.randomUUID();
    return new Order(orderId, new Email(email));
  }

  public addItem(product: Product, quantity: number): void {
    this.itens.push(
      new Item(product.productId, product.price, quantity, this.orderId),
    );
  }

  public applyCoupon(coupon: Coupon): void {
    if (!coupon.isExpired()) {
      this.coupon = coupon;
    }
  }

  public getTotal(): number {
    let total = 0;
    for (const item of this.itens) {
      total += item.getTotal();
    }
    if (this.coupon) {
      total -= this.coupon.getDisconuntAmount(total);
    }

    return total;
  }
}
