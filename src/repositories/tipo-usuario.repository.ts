import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbdsDataSource} from '../datasources';
import {TipoUsuario, TipoUsuarioRelations, Login} from '../models';
import {LoginRepository} from './login.repository';

export class TipoUsuarioRepository extends DefaultCrudRepository<
  TipoUsuario,
  typeof TipoUsuario.prototype._id,
  TipoUsuarioRelations
> {

  public readonly logins: HasManyRepositoryFactory<Login, typeof TipoUsuario.prototype._id>;

  constructor(
    @inject('datasources.mongodbds') dataSource: MongodbdsDataSource, @repository.getter('LoginRepository') protected loginRepositoryGetter: Getter<LoginRepository>,
  ) {
    super(TipoUsuario, dataSource);
    this.logins = this.createHasManyRepositoryFactoryFor('logins', loginRepositoryGetter,);
    this.registerInclusionResolver('logins', this.logins.inclusionResolver);
  }
}
