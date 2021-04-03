import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Bloque, BloqueRelations, Inmueble} from '../models';
import {InmuebleRepository} from './inmueble.repository';

export class BloqueRepository extends DefaultCrudRepository<
  Bloque,
  typeof Bloque.prototype.id,
  BloqueRelations
> {

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof Bloque.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Bloque, dataSource);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
  }
}
