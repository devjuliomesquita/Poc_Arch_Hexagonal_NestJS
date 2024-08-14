export default class OutputGetOrderDTO {
  constructor(
    readonly orderID: string,
    readonly email: string,
    readonly total: number,
  ) {}
}
