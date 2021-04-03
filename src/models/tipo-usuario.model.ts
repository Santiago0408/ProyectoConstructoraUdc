import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoUsuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: String;

  @property({
    type: 'number',
    required: true,
  })
  rol: number;


  constructor(data?: Partial<TipoUsuario>) {
    super(data);
  }
}

export interface TipoUsuarioRelations {
  // describe navigational properties here
}

export type TipoUsuarioWithRelations = TipoUsuario & TipoUsuarioRelations;
