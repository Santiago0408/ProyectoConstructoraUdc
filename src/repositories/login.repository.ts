import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbdsDataSource} from '../datasources';
import {Login, LoginRelations} from '../models';

export class LoginRepository extends DefaultCrudRepository<
  Login,
  typeof Login.prototype._id,
  LoginRelations
> {
  constructor(
    @inject('datasources.mongodbds') dataSource: MongodbdsDataSource,
  ) {
    super(Login, dataSource);
  }
}
