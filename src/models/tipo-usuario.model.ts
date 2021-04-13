import {Entity, hasMany, model, property} from '@loopback/repository';
import {Login} from './login.model';

@model()
export class TipoUsuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  rol: number;

  @hasMany(() => Login)
  logins: Login[];

  constructor(data?: Partial<TipoUsuario>) {
    super(data);
  }
}

export interface TipoUsuarioRelations {
  // describe navigational properties here
}

export type TipoUsuarioWithRelations = TipoUsuario & TipoUsuarioRelations;
