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
  Solicitud,
  Pago,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudPagoController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/pago', {
    responses: {
      '200': {
        description: 'Solicitud has one Pago',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pago),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pago>,
  ): Promise<Pago> {
    return this.solicitudRepository.pago(id).get(filter);
  }

  @post('/solicituds/{id}/pago', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pago)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {
            title: 'NewPagoInSolicitud',
            exclude: ['id'],
            optional: ['solicitudId']
          }),
        },
      },
    }) pago: Omit<Pago, 'id'>,
  ): Promise<Pago> {
    return this.solicitudRepository.pago(id).create(pago);
  }

  @patch('/solicituds/{id}/pago', {
    responses: {
      '200': {
        description: 'Solicitud.Pago PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {partial: true}),
        },
      },
    })
    pago: Partial<Pago>,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.solicitudRepository.pago(id).patch(pago, where);
  }

  @del('/solicituds/{id}/pago', {
    responses: {
      '200': {
        description: 'Solicitud.Pago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.solicitudRepository.pago(id).delete(where);
  }
}
