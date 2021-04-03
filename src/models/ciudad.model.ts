import {Entity, model, property, hasMany} from '@loopback/repository';
import {Proyecto} from './proyecto.model';
import {Cliente} from './cliente.model';
import {User} from './user.model';

@model()
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
