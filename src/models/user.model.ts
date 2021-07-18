import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_ciudadxuser_id: {
        name: 'fk_ciudadxuser_id',
        entity: 'Ciudad',
        entityKey: 'id',
        foreignKey: 'ciudadId'
      }
    },
  }
})
export class User extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'number',
    required: true,
  })
  documento: number;

  @property({
    type: 'string',
  })
  correoElectronico?: string;

  @property({
    type: 'string',
  })
  numCelular?: string;

  @property({
    type: 'string',
    required: true,
  })
  rol: String;

  @property({
    type: 'number',
  })
  ciudadId?: number;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
