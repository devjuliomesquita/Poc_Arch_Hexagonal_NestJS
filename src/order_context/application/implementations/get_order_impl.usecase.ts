import Order from 'src/order_context/domain/order';
import InputGetOrderDTO from '../dtos/input_get.dto';
import GetOrder from '../interfaces/get_order.usecase';
import OrderRepository from 'src/order_context/infrastruture/repositories/interfaces/order.repository';
import { Injectable } from '@nestjs/common';
import OutputGetOrderDTO from '../dtos/output_get.dto';

@Injectable()
export default class GetOrderImpl implements GetOrder {
  constructor(private readonly orderRepository: OrderRepository) {}
  async execute(input: InputGetOrderDTO): Promise<OutputGetOrderDTO> {
    const order: Order = await this.orderRepository.getOrder(input.orderId);
    return {
      orderID: order.orderId,
      email: order.email.value,
      total: order.getTotal(),
    };
  }
}
