import RecordBase from '../shared/record_base';

export default class Item extends RecordBase {
  constructor(
    readonly productId: string,
    readonly price: number,
    readonly quantity: number,
    readonly orderId: string,
  ) {
    super({ productId, price, quantity, orderId });
  }

  public getTotal(): number {
    return this.price * this.quantity;
  }
}
