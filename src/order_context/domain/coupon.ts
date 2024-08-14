import RecordBase from '../shared/record_base';

export default class Coupon extends RecordBase {
  constructor(
    readonly code: string,
    readonly percentege: number,
    readonly expireDate: Date,
  ) {
    super({ code, percentege, expireDate });
  }

  public isExpired(): boolean {
    const today: Date = new Date();
    return this.expireDate.getTime() < today.getTime();
  }

  public getDisconuntAmount(total: number): number {
    return (total * this.percentege) / 100;
  }
}
