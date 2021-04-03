import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {InfoFinanciera, InfoFinancieraRelations} from '../models';

export class InfoFinancieraRepository extends DefaultCrudRepository<
  InfoFinanciera,
  typeof InfoFinanciera.prototype.id,
  InfoFinancieraRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(InfoFinanciera, dataSource);
  }
}
