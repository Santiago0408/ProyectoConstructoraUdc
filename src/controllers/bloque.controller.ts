import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Bloque} from '../models';
import {BloqueRepository} from '../repositories';

export class BloqueController {
  constructor(
    @repository(BloqueRepository)
    public bloqueRepository : BloqueRepository,
  ) {}

  @post('/bloque')
  @response(200, {
    description: 'Bloque model instance',
    content: {'application/json': {schema: getModelSchemaRef(Bloque)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloque, {
            title: 'NewBloque',
            exclude: ['id'],
          }),
        },
      },
    })
    bloque: Omit<Bloque, 'id'>,
  ): Promise<Bloque> {
    return this.bloqueRepository.create(bloque);
  }

  @get('/bloque/count')
  @response(200, {
    description: 'Bloque model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Bloque) where?: Where<Bloque>,
  ): Promise<Count> {
    return this.bloqueRepository.count(where);
  }

  @get('/bloque')
  @response(200, {
    description: 'Array of Bloque model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Bloque, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Bloque) filter?: Filter<Bloque>,
  ): Promise<Bloque[]> {
    return this.bloqueRepository.find(filter);
  }

  @patch('/bloque')
  @response(200, {
    description: 'Bloque PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloque, {partial: true}),
        },
      },
    })
    bloque: Bloque,
    @param.where(Bloque) where?: Where<Bloque>,
  ): Promise<Count> {
    return this.bloqueRepository.updateAll(bloque, where);
  }

  @get('/bloque/{id}')
  @response(200, {
    description: 'Bloque model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Bloque, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Bloque, {exclude: 'where'}) filter?: FilterExcludingWhere<Bloque>
  ): Promise<Bloque> {
    return this.bloqueRepository.findById(id, filter);
  }

  @patch('/bloque/{id}')
  @response(204, {
    description: 'Bloque PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloque, {partial: true}),
        },
      },
    })
    bloque: Bloque,
  ): Promise<void> {
    await this.bloqueRepository.updateById(id, bloque);
  }

  @put('/bloque/{id}')
  @response(204, {
    description: 'Bloque PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bloque: Bloque,
  ): Promise<void> {
    await this.bloqueRepository.replaceById(id, bloque);
  }

  @del('/bloque/{id}')
  @response(204, {
    description: 'Bloque DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bloqueRepository.deleteById(id);
  }
}
