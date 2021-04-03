import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Pago} from '../models';
import {PagoRepository} from './pago.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly pago: HasOneRepositoryFactory<Pago, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('PagoRepository') protected pagoRepositoryGetter: Getter<PagoRepository>,
  ) {
    super(Solicitud, dataSource);
    this.pago = this.createHasOneRepositoryFactoryFor('pago', pagoRepositoryGetter);
    this.registerInclusionResolver('pago', this.pago.inclusionResolver);
  }
}
