import { Injectable } from '@nestjs/common';
import ConnectionAdapter from '../interfaces/connection.adapter';
import { QueryRunner } from 'typeorm';
import { dataSource } from '../../configuration/data_source';

@Injectable()
export class ConnectionAdapterImpl implements ConnectionAdapter {
  private queryRunner: QueryRunner;
  constructor() {
    this.queryRunner = dataSource.createQueryRunner();
  }
  async connect(): Promise<void> {
    this.queryRunner.connect();
  }
  async startTransaction(): Promise<void> {
    this.queryRunner.startTransaction();
  }
  async commitTransaction(): Promise<void> {
    this.queryRunner.commitTransaction();
  }
  async rollbackTransaction(): Promise<void> {
    this.queryRunner.rollbackTransaction();
  }
  async release(): Promise<void> {
    this.queryRunner.release();
  }
  async query(statement: string, params: any): Promise<any> {
    return this.queryRunner.query(statement, params);
  }
}
