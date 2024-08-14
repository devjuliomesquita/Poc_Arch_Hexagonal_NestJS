import { RecordBase } from '../common';

export default class Email extends RecordBase {
  value: string;

  constructor(readonly email: string) {
    super({ email });
    if (!this.isvalid(email)) {
      throw new Error('Invalid email.');
    }
  }

  private isvalid(email: string): boolean {
    if (email != null) {
      return true;
    }
    return false;
  }
}
