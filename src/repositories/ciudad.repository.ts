import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Proyecto, Cliente, User} from '../models';
import {ProyectoRepository} from './proyecto.repository';
import {ClienteRepository} from './cliente.repository';
import {UserRepository} from './user.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly proyectos: HasManyRepositoryFactory<Proyecto, typeof Ciudad.prototype.id>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Ciudad.prototype.id>;

  public readonly users: HasManyRepositoryFactory<User, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ProyectoRepository') protected proyectoRepositoryGetter: Getter<ProyectoRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Ciudad, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.proyectos = this.createHasManyRepositoryFactoryFor('proyectos', proyectoRepositoryGetter,);
    this.registerInclusionResolver('proyectos', this.proyectos.inclusionResolver);
  }
}
