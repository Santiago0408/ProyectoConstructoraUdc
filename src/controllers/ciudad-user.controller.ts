import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Ciudad,
  User,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadUserController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Ciudad has many User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.ciudadRepository.users(id).find(filter);
  }

  @post('/ciudads/{id}/users', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Ciudad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInCiudad',
            exclude: ['id'],
            optional: ['ciudadId']
          }),
        },
      },
    }) user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.ciudadRepository.users(id).create(user);
  }

  @patch('/ciudads/{id}/users', {
    responses: {
      '200': {
        description: 'Ciudad.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.ciudadRepository.users(id).patch(user, where);
  }

  @del('/ciudads/{id}/users', {
    responses: {
      '200': {
        description: 'Ciudad.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.ciudadRepository.users(id).delete(where);
  }
}
