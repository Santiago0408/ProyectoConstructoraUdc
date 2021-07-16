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
import {keys as llaves} from '../config/keys';
import {Login, ResetearClave} from '../models';
import {Credenciales} from '../models/credenciales.model';
import {LoginRepository} from '../repositories';
import {FuncionesGeneralesService, NotificacionesService, SesionService} from '../services';

@authenticate('admin')
export class LoginController {
  constructor(
    @repository(LoginRepository)
    public loginRepository: LoginRepository,
    @service(FuncionesGeneralesService)
    public servicioFunciones: FuncionesGeneralesService,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
    @service(SesionService)
    public serviciosesion: SesionService
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
    let contenido;
    if (usuarioCreado && usuarioCreado.tipoUsuarioId === '6068f2c6b4388d860e4e2a3a') {
      contenido = `Hola , buen dia. <br/>
      <ul>
        <li> Usuario: ${usuarioCreado.correo} </li>
        <li> Contraseña: ${claveAleatoria}  </li>
        <li> y tu rol es: Administrador  </li>
      </ul>
      Gracias.
      `;
      this.servicioNotificaciones.EnviarCorreoElectronico(usuarioCreado.correo, llaves.asuntoNuevoUsuario, contenido);
    } else {
      contenido = `Hola , buen dia. <br/>
      <ul>
        <li> Usuario: ${usuarioCreado.correo} </li>
        <li> Contraseña: ${claveAleatoria}  </li>
        <li> y tu rol es: Vendedor  </li>
      </ul>
      Gracias.
      `;
      this.servicioNotificaciones.EnviarCorreoElectronico(usuarioCreado.correo, llaves.asuntoNuevoUsuario, contenido);
    }

    return usuarioCreado;
  }

  @post('/reset-password')
  @response(200, {
    description: 'Login model instance',
    content: {'application/json': {schema: getModelSchemaRef(Login)}},
  })
  async resetPassword(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResetearClave,),
        },
      },
    })
    resetearClave: ResetearClave,
  ): Promise<Object> {

    let usuario = await this.loginRepository.findOne({where: {correo: resetearClave.correo}})
    if (!usuario) {
      throw new HttpErrors[401]("Este usuario no existe");
    }

    let claveAleatoria = this.servicioFunciones.GenerarClaveAleatoria();
    console.log(claveAleatoria);

    let claveCifrada = this.servicioFunciones.CifrarTexto(claveAleatoria);
    console.log(claveCifrada);

    usuario.clave = claveCifrada;
    await this.loginRepository.update(usuario);

    let contenido = `Hola , buen dia usted a solicitado una nueva clave twilio, sus datos son:
      Usuario: ${usuario.correo} y Contraseña: ${claveAleatoria}
      Gracias.
      `;
    this.servicioNotificaciones.EnviarNotificacionesPorSMS(usuario.telefono, contenido);
    return {
      envio: "OK. ENVIADOO"
    };
  }

  @authenticate.skip()
  @post('/identificar-usuario')
  async validar(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: getModelSchemaRef(Credenciales)
          }
        }
      }
    )
    credenciales: Credenciales
  ): Promise<object> {
    let usuario = await this.loginRepository.findOne({where: {correo: credenciales.correo, clave: credenciales.clave}});
    if (usuario) {
      //generar un token
      let token = this.serviciosesion.GenerarToken(usuario);
      return {
        user: {
          username: usuario.correo,
          role: usuario.tipoUsuarioId
        },
        tk: token,
        role: usuario.tipoUsuarioId
      };
    } else {
      throw new HttpErrors[401]("Las credenciales no son correctas");
    }
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
