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
  Estado,
  Solicitud,
} from '../models';
import {EstadoRepository} from '../repositories';

export class EstadoSolicitudController {
  constructor(
    @repository(EstadoRepository) protected estadoRepository: EstadoRepository,
  ) { }

  @get('/estados/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of Estado has many Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.estadoRepository.solicitudes(id).find(filter);
  }

  @post('/estados/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Estado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Estado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInEstado',
            exclude: ['id'],
            optional: ['estadoId']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.estadoRepository.solicitudes(id).create(solicitud);
  }

  @patch('/estados/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Estado.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.estadoRepository.solicitudes(id).patch(solicitud, where);
  }

  @del('/estados/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Estado.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.estadoRepository.solicitudes(id).delete(where);
  }
}
