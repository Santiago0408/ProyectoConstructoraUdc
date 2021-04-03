import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model()
export class Estado extends Entity {
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
  nombre: string;

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  constructor(data?: Partial<Estado>) {
    super(data);
  }
}

export interface EstadoRelations {
  // describe navigational properties here
}

export type EstadoWithRelations = Estado & EstadoRelations;
