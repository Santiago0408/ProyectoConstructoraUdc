import {Entity, model, property} from '@loopback/repository';

@model()
export class InfoFinanciera extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  total_ingresos: number;

  @property({
    type: 'string',
    required: true,
  })
  datos_trabajo: string;

  @property({
    type: 'date',
    required: true,
  })
  tiempo_trabajo_actual: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_ref_fam: string;

  @property({
    type: 'string',
    required: true,
  })
  tel_ref_fam: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_ref_personal: string;

  @property({
    type: 'string',
    required: true,
  })
  tel_ref_personal: string;


  constructor(data?: Partial<InfoFinanciera>) {
    super(data);
  }
}

export interface InfoFinancieraRelations {
  // describe navigational properties here
}

export type InfoFinancieraWithRelations = InfoFinanciera & InfoFinancieraRelations;
