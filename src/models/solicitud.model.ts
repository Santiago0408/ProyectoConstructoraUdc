import {Entity, hasOne, model, property} from '@loopback/repository';
import {Pago} from './pago.model';

@model({
  settings: {
    foreignKeys: {
      fk_Sinmueble_id: {
        name: 'fk_Sinmueble_id',
        entity: 'Inmueble',
        entityKey: 'id',
        foreignKey: 'inmuebleId'
      },
      fk_Sestado_id: {
        name: 'fk_Sestado_id',
        entity: 'Estado',
        entityKey: 'id',
        foreignKey: 'estadoId'
      },
      fk_Scliente_id: {
        name: 'fk_Scliente_id',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId'
      }
    },
  }
})
export class Solicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_solicitud: string;

  @property({
    type: 'number',
    required: true,
  })
  Oferta_economica: number;

  @property({
    type: 'number',
  })
  inmuebleId?: number;

  @property({
    type: 'number',
  })
  estadoId?: number;

  @hasOne(() => Pago)
  pago: Pago;

  @property({
    type: 'number',
  })
  clienteId?: number;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
