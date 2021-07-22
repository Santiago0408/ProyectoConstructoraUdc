import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
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
import {Cliente, NotificarSolicitud} from '../models';
import {ClienteRepository} from '../repositories';
import {NotificacionesService} from '../services';

//@authenticate('vend')
export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
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
    console.log(cliente);
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



  @post('/cliente/notificacionSolicitud')
  @response(200, {
    description: 'Login model instance',
    content: {'application/json': {schema: getModelSchemaRef(NotificarSolicitud)}},
  })
  async changePassword(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NotificarSolicitud,),
        },
      },
    })
    cliente: NotificarSolicitud,
  ): Promise<Object> {

    console.log(cliente)
    if (!cliente) {
      throw new HttpErrors[401]("Este usuario no existe");
    }

    if (cliente.estado == 2) {
      let contenido = `Hola , estimado cliente  ${cliente.nombre} ${cliente.apellido} su Solicitud a sido Aceptada!!!`;
      this.servicioNotificaciones.EnviarNotificacionesPorSMS(cliente.numCelular, contenido);
      this.servicioNotificaciones.EnviarCorreoElectronico(cliente.correoElectronico, "Solicitud", contenido);
    } else if (cliente.estado == 3) {
      let contenido = `Hola , estimado cliente ${cliente.nombre} ${cliente.apellido} su Solicitud a sido Rechazada`;
      this.servicioNotificaciones.EnviarNotificacionesPorSMS(cliente.numCelular, contenido);
      this.servicioNotificaciones.EnviarCorreoElectronico(cliente.correoElectronico, "Solicitud", contenido);
    }
    return {
      envio: "OK Enviado"
    };


  }





}
