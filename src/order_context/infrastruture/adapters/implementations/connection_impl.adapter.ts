import { Injectable } from '@nestjs/common';
import ConnectionAdapter from '../interfaces/connection.adapter';
import { QueryRunner } from 'typeorm';
import { dataSource } from '../../configuration/data_source';

@Injectable()
export class ConnectionAdapterImpl implements ConnectionAdapter {
  private queryRunner: QueryRunner;
  constructor() {
    this.createQueryRunner();
  }
  private createQueryRunner() {
    this.queryRunner = dataSource.createQueryRunner();
  }
  async connect(): Promise<void> {
    if (this.queryRunner.isReleased) {
      console.log('conexao fechada.');
      this.createQueryRunner();
    }
    this.queryRunner.connect();
    console.log('conexao aberta.');
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
    if (this.queryRunner.isReleased) {
      console.log('conexao fechada.');
    }
  }
  async query(statement: string, params: any): Promise<any> {
    return this.queryRunner.query(statement, params);
  }
}
