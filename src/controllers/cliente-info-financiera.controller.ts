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
  Cliente,
  InfoFinanciera,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteInfoFinancieraController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/info-financiera', {
    responses: {
      '200': {
        description: 'Cliente has one InfoFinanciera',
        content: {
          'application/json': {
            schema: getModelSchemaRef(InfoFinanciera),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InfoFinanciera>,
  ): Promise<InfoFinanciera> {
    return this.clienteRepository.infoFinanciera(id).get(filter);
  }

  @post('/clientes/{id}/info-financiera', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(InfoFinanciera)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfoFinanciera, {
            title: 'NewInfoFinancieraInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) infoFinanciera: Omit<InfoFinanciera, 'id'>,
  ): Promise<InfoFinanciera> {
    return this.clienteRepository.infoFinanciera(id).create(infoFinanciera);
  }

  @patch('/clientes/{id}/info-financiera', {
    responses: {
      '200': {
        description: 'Cliente.InfoFinanciera PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfoFinanciera, {partial: true}),
        },
      },
    })
    infoFinanciera: Partial<InfoFinanciera>,
    @param.query.object('where', getWhereSchemaFor(InfoFinanciera)) where?: Where<InfoFinanciera>,
  ): Promise<Count> {
    return this.clienteRepository.infoFinanciera(id).patch(infoFinanciera, where);
  }

  @del('/clientes/{id}/info-financiera', {
    responses: {
      '200': {
        description: 'Cliente.InfoFinanciera DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InfoFinanciera)) where?: Where<InfoFinanciera>,
  ): Promise<Count> {
    return this.clienteRepository.infoFinanciera(id).delete(where);
  }
}
