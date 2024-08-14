export const CONNECTION_ADAPTER = Symbol('ConnectionAdapter');
export default interface ConnectionAdapter {
  query(statement: string, params: any): Promise<any>;
  connect(): Promise<void>;
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
  release(): Promise<void>;
}
