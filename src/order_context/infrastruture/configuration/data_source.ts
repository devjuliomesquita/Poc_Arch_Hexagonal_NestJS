import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: '123',
  database: 'test',
  //   entities: ['dist/**/*.entity{.ts,.js}'],
  //   migrations: ['dist/shared/infra/database/migrations/*{.ts,.js}'],
  synchronize: false,
  // logging: true,
};
export const dataSource = new DataSource(dataSourceOptions);
