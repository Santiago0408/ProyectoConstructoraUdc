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
  TipoUsuario,
  Login,
} from '../models';
import {TipoUsuarioRepository} from '../repositories';

export class TipoUsuarioLoginController {
  constructor(
    @repository(TipoUsuarioRepository) protected tipoUsuarioRepository: TipoUsuarioRepository,
  ) { }

  @get('/tipo-usuarios/{id}/logins', {
    responses: {
      '200': {
        description: 'Array of TipoUsuario has many Login',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Login)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Login>,
  ): Promise<Login[]> {
    return this.tipoUsuarioRepository.logins(id).find(filter);
  }

  @post('/tipo-usuarios/{id}/logins', {
    responses: {
      '200': {
        description: 'TipoUsuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Login)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TipoUsuario.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Login, {
            title: 'NewLoginInTipoUsuario',
            exclude: ['_id'],
            optional: ['tipoUsuarioId']
          }),
        },
      },
    }) login: Omit<Login, '_id'>,
  ): Promise<Login> {
    return this.tipoUsuarioRepository.logins(id).create(login);
  }

  @patch('/tipo-usuarios/{id}/logins', {
    responses: {
      '200': {
        description: 'TipoUsuario.Login PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Login, {partial: true}),
        },
      },
    })
    login: Partial<Login>,
    @param.query.object('where', getWhereSchemaFor(Login)) where?: Where<Login>,
  ): Promise<Count> {
    return this.tipoUsuarioRepository.logins(id).patch(login, where);
  }

  @del('/tipo-usuarios/{id}/logins', {
    responses: {
      '200': {
        description: 'TipoUsuario.Login DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Login)) where?: Where<Login>,
  ): Promise<Count> {
    return this.tipoUsuarioRepository.logins(id).delete(where);
  }
}
