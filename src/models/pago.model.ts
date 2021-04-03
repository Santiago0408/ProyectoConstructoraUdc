import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_solicitud_id: {
        name: 'fk_solicitud_id',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'solicitudId'
      }
    },
  }
})
export class Pago extends Entity {
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
  Comprobante: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'number',
  })
  solicitudId?: number;

  constructor(data?: Partial<Pago>) {
    super(data);
  }
}

export interface PagoRelations {
  // describe navigational properties here
}

export type PagoWithRelations = Pago & PagoRelations;
