import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {InfoFinanciera} from './info-financiera.model';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_ciudadxcliente_id: {
        name: 'fk_ciudadxcliente_id',
        entity: 'Ciudad',
        entityKey: 'id',
        foreignKey: 'ciudadId'
      }
    },
  }
})
export class Cliente extends Entity {
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
  documento: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @property({
    type: 'number',
  })
  numCelular?: number;

  @property({
    type: 'string',
  })
  correoElectronico?: string;

  @property({
    type: 'string',
  })
  direccion?: string;

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  @property({
    type: 'number',
  })
  ciudadId?: number;

  @hasOne(() => InfoFinanciera)
  infoFinanciera: InfoFinanciera;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
