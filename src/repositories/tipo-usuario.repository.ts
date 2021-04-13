import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongodbdsDataSource} from '../datasources';
import {Login, TipoUsuario, TipoUsuarioRelations} from '../models';
import {LoginRepository} from './login.repository';

export class TipoUsuarioRepository extends DefaultCrudRepository<
  TipoUsuario,
  typeof TipoUsuario.prototype.id,
  TipoUsuarioRelations
> {

  public readonly logins: HasManyRepositoryFactory<Login, typeof TipoUsuario.prototype.id>;

  constructor(
    @inject('datasources.mongodbds') dataSource: MongodbdsDataSource, @repository.getter('LoginRepository') protected loginRepositoryGetter: Getter<LoginRepository>,
  ) {
    super(TipoUsuario, dataSource);
    this.logins = this.createHasManyRepositoryFactoryFor('logins', loginRepositoryGetter,);
    this.registerInclusionResolver('logins', this.logins.inclusionResolver);
  }
}
