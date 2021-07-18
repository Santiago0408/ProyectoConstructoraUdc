import {Model, model, property} from '@loopback/repository';

@model()
export class Correo extends Model {
  @property({
    type: 'string',
    required: true,
  })
  correo: string;


  constructor(data?: Partial<Correo>) {
    super(data);
  }
}

export interface CorreoRelations {
  // describe navigational properties here
}

export type CorreoWithRelations = Correo & CorreoRelations;
