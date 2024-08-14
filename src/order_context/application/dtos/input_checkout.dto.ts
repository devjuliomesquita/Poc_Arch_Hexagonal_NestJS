import InputItemDTO from './input_item.dto';

export default class InputCheckoutDTO {
  constructor(
    readonly email: string,
    readonly itens: InputItemDTO[],
    readonly code?: string,
  ) {}
}
