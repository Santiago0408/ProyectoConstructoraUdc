import {Model, model, property} from '@loopback/repository';

@model()
export class Cambiarcontrasena extends Model {
  @property({
    type: 'string',
    required: true,
  })
  oldPassword: string;

  @property({
    type: 'string',
    required: true,
  })
  newPassword: string;


  constructor(data?: Partial<Cambiarcontrasena>) {
    super(data);
  }
}

export interface CambiarcontrasenaRelations {
  // describe navigational properties here
}

export type CambiarcontrasenaWithRelations = Cambiarcontrasena & CambiarcontrasenaRelations;
