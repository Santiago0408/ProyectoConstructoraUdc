import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Proyecto, ProyectoRelations, Bloque} from '../models';
import {BloqueRepository} from './bloque.repository';

export class ProyectoRepository extends DefaultCrudRepository<
  Proyecto,
  typeof Proyecto.prototype.id,
  ProyectoRelations
> {

  public readonly bloques: HasManyRepositoryFactory<Bloque, typeof Proyecto.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('BloqueRepository') protected bloqueRepositoryGetter: Getter<BloqueRepository>,
  ) {
    super(Proyecto, dataSource);
    this.bloques = this.createHasManyRepositoryFactoryFor('bloques', bloqueRepositoryGetter,);
    this.registerInclusionResolver('bloques', this.bloques.inclusionResolver);
  }
}
