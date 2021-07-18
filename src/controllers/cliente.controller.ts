import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Cliente, Correo} from '../models';
import {ClienteRepository} from '../repositories';

//@authenticate('vend')
export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @post('/cliente')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.clienteRepository.create(cliente);
  }
  @authenticate.skip()
  @get('/cliente/count')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @authenticate.skip()
  @get('/cliente')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.clienteRepository.find(filter);
  }

  @patch('/cliente')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @get('/cliente/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @patch('/cliente/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/cliente/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/cliente/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }

  @get('/Cliente/correo-electronico/{correo}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Correo, {includeRelations: true}),
      },
    },
  })
  async findOne(
    @param.path.string('correo') correo: Correo,
    @param.filter(Correo, {exclude: 'where'}) filter?: FilterExcludingWhere<Correo>
  ): Promise<object> {
    let usuario = await this.clienteRepository.findOne({where: {correoElectronico: correo.correo}});
    if (usuario) {
      return {
        documento: usuario.documento,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        fechaNacimiento: usuario.fechaNacimiento,
        foto: usuario.foto,
        numCelular: usuario.numCelular,
        correoElectronico: usuario.correoElectronico,
        direccion: usuario.direccion,
        ciudadId: usuario.ciudadId
      };
    } else {
      throw new HttpErrors[401]("El correo no es correcto");
    }
  }



}
