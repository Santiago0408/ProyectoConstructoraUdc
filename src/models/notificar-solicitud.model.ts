import {Model, model, property} from '@loopback/repository';

@model()
export class NotificarSolicitud extends Model {
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
    type: 'string',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @property({
    type: 'string',
    required: true,
  })
  numCelular: string;

  @property({
    type: 'string',
    required: true,
  })
  correoElectronico: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'number',
    required: true,
  })
  ciudadId: number;

  @property({
    type: 'number',
    required: true,
  })
  estado: number;


  constructor(data?: Partial<NotificarSolicitud>) {
    super(data);
  }
}

export interface NotificarSolicitudRelations {
  // describe navigational properties here
}

export type NotificarSolicitudWithRelations = NotificarSolicitud & NotificarSolicitudRelations;
