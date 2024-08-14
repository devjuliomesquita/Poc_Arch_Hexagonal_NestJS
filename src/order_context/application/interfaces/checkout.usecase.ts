import InputCheckoutDTO from '../dtos/input_checkout.dto';

export default interface Checkout {
  execute(input: InputCheckoutDTO): Promise<string>;
}
