import {Entity, hasMany, model, property} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_bloque_id: {
        name: 'fk_bloque_id',
        entity: 'Bloque',
        entityKey: 'id',
        foreignKey: 'bloqueId'
      }
    },
  }
})
export class Inmueble extends Entity {
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
  identificador: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'number',
  })
  bloqueId?: number;

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
