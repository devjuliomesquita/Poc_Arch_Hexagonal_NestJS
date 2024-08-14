import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import InputCheckoutDTO from 'src/order_context/application/dtos/input_checkout.dto';
import InputGetOrderDTO from 'src/order_context/application/dtos/input_get.dto';
import OutputGetOrderDTO from 'src/order_context/application/dtos/output_get.dto';
import Checkout, {
  CHECKOUT,
} from 'src/order_context/application/interfaces/checkout.usecase';
import GetOrder, {
  GET_ORDER,
} from 'src/order_context/application/interfaces/get_order.usecase';

@Controller()
export default class OrderController {
  @Inject(CHECKOUT)
  private readonly checkout: Checkout;
  @Inject(GET_ORDER)
  private readonly getOrder: GetOrder;

  @Post('checkout')
  async createOrder(@Body() request: InputCheckoutDTO): Promise<string> {
    const orderId: string = await this.checkout.execute(request);
    return orderId;
  }

  @Get(':order-id')
  async getOrderById(
    @Param('order-id') orderId: string,
  ): Promise<OutputGetOrderDTO> {
    return await this.getOrder.execute(new InputGetOrderDTO(orderId));
  }
}
