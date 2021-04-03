import {Entity, hasMany, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Proyecto} from './proyecto.model';
import {User} from './user.model';

@model({
  settings: {
    foreignKeys: {
      fk_pais_id: {
        name: 'fk_pais_id',
        entity: 'Pais',
        entityKey: 'id',
        foreignKey: 'paisId'
      }
    },
  }
})
export class Ciudad extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  codigo: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
  })
  paisId?: number;

  @hasMany(() => Proyecto)
  proyectos: Proyecto[];

  @hasMany(() => Cliente)
  clientes: Cliente[];

  @hasMany(() => User)
  users: User[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
