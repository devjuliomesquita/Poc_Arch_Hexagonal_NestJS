import InputGetOrderDTO from '../dtos/input_get.dto';
import OutputGetOrderDTO from '../dtos/output_get.dto';

export const GET_ORDER = Symbol('GetOrder');
export default interface GetOrder {
  execute(input: InputGetOrderDTO): Promise<OutputGetOrderDTO>;
}
