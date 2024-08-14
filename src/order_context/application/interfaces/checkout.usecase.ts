import InputCheckoutDTO from '../dtos/input_checkout.dto';

export const CHECKOUT = Symbol('Checkout');
export default interface Checkout {
  execute(input: InputCheckoutDTO): Promise<string>;
}
