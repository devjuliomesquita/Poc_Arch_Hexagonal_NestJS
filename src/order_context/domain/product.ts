import RecordBase from '../shared/record_base';

export default class Product extends RecordBase {
  constructor(
    readonly productId: string,
    readonly description: string,
    readonly price: number,
  ) {
    super({ productId, description, price });
  }
}
