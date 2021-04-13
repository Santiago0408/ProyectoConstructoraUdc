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
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {keys as llaves} from '../config/keys';
import {Login} from '../models';
import {LoginRepository} from '../repositories';
import {FuncionesGeneralesService, NotificacionesService} from '../services';

export class LoginController {
  constructor(
    @repository(LoginRepository)
    public loginRepository: LoginRepository,
    @service(FuncionesGeneralesService)
    public servicioFunciones: FuncionesGeneralesService,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService
  ) { }

  @post('/logins')
  @response(200, {
    description: 'Login model instance',
    content: {'application/json': {schema: getModelSchemaRef(Login)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Login, {
            title: 'NewLogin',
            exclude: ['id', 'clave'],
          }),
        },
      },
    })
    login: Omit<Login, 'id'>,
  ): Promise<Login> {

    let claveAleatoria = this.servicioFunciones.GenerarClaveAleatoria();
    console.log(claveAleatoria);

    let claveCifrada = this.servicioFunciones.CifrarTexto(claveAleatoria);
    console.log(claveCifrada);

    login.clave = claveCifrada;
    let usuarioCreado = await this.loginRepository.create(login);
    if (usuarioCreado) {
      let contenido = `Hola , buen dia. <br/>
      <ul>
        <li> Usuario: ${usuarioCreado.correo} </li>
        <li> Contraseña: ${claveAleatoria}  </li>
      </ul>

      Gracias.
      `;
      this.servicioNotificaciones.EnviarCorreoElectronico(usuarioCreado.correo, llaves.asuntoNuevoUsuario, contenido);
    }

    return usuarioCreado;
  }

  @get('/logins/count')
  @response(200, {
    description: 'Login model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Login) where?: Where<Login>,
  ): Promise<Count> {
    return this.loginRepository.count(where);
  }

  @get('/logins')
  @response(200, {
    description: 'Array of Login model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Login, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Login) filter?: Filter<Login>,
  ): Promise<Login[]> {
    return this.loginRepository.find(filter);
  }

  @patch('/logins')
  @response(200, {
    description: 'Login PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Login, {partial: true}),
        },
      },
    })
    login: Login,
    @param.where(Login) where?: Where<Login>,
  ): Promise<Count> {
    return this.loginRepository.updateAll(login, where);
  }

  @get('/logins/{id}')
  @response(200, {
    description: 'Login model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Login, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Login, {exclude: 'where'}) filter?: FilterExcludingWhere<Login>
  ): Promise<Login> {
    return this.loginRepository.findById(id, filter);
  }

  @patch('/logins/{id}')
  @response(204, {
    description: 'Login PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Login, {partial: true}),
        },
      },
    })
    login: Login,
  ): Promise<void> {
    await this.loginRepository.updateById(id, login);
  }

  @put('/logins/{id}')
  @response(204, {
    description: 'Login PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() login: Login,
  ): Promise<void> {
    await this.loginRepository.replaceById(id, login);
  }

  @del('/logins/{id}')
  @response(204, {
    description: 'Login DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.loginRepository.deleteById(id);
  }
}
