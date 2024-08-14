export abstract class RecordBase {
  constructor(properties: { [key: string]: any }) {
    Object.assign(this, properties);
  }

  toString(): string {
    return JSON.stringify(this);
  }

  equals(other: this): boolean {
    return JSON.stringify(this) === JSON.stringify(other);
  }
}
