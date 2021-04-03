import {Entity, hasMany, model, property} from '@loopback/repository';
import {Inmueble} from './inmueble.model';

@model({
  settings: {
    foreignKeys: {
      fk_proyecto_id: {
        name: 'fk_proyecto_id',
        entity: 'Proyecto',
        entityKey: 'id',
        foreignKey: 'proyectoId',
      }
    },
  },
})
export class Bloque extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
  })
  proyectoId?: number;

  @hasMany(() => Inmueble)
  inmuebles: Inmueble[];

  constructor(data?: Partial<Bloque>) {
    super(data);
  }
}

export interface BloqueRelations {
  // describe navigational properties here
}

export type BloqueWithRelations = Bloque & BloqueRelations;
