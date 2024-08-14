export default interface ConnectionAdapter {
  query(statement: string, params: any): Promise<any>;
  close(): Promise<any>;
}
