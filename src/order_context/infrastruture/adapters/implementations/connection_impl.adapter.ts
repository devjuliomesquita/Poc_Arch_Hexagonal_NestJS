import { Injectable } from '@nestjs/common';
import ConnectionAdapter from '../interfaces/connection.adapter';
import pgPromise from 'pg-promise';

@Injectable()
export default class ConnectionAdapterImpl implements ConnectionAdapter {
  private connection: any;
  constructor() {
    const pgp = pgPromise();
    this.connection = pgp('postgres://test:123@localhost:5432/test');
  }
  query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }
  close(): Promise<any> {
    return this.connection.$pool.end();
  }
}
