import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Cliente, ClienteRelations, Solicitud, InfoFinanciera} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {InfoFinancieraRepository} from './info-financiera.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Cliente.prototype.id>;

  public readonly infoFinanciera: HasOneRepositoryFactory<InfoFinanciera, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('InfoFinancieraRepository') protected infoFinancieraRepositoryGetter: Getter<InfoFinancieraRepository>,
  ) {
    super(Cliente, dataSource);
    this.infoFinanciera = this.createHasOneRepositoryFactoryFor('infoFinanciera', infoFinancieraRepositoryGetter);
    this.registerInclusionResolver('infoFinanciera', this.infoFinanciera.inclusionResolver);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
  }
}
