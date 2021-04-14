import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {keys as llaves} from '../config/keys';
import {Login} from '../models';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class SesionService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Funcion que genera un token JWT
   */

  GenerarToken(usuario: Login): string {
    let tk = jwt.sign({
      exp: llaves.tiempoVencimientoJWT,
      data: {
        username: usuario.correo,
        role: usuario.tipoUsuarioId
      }
    }, llaves.clavesecretaJWT);
    return tk;
  }

  /**
   * Verificar validez de un token JWT
   */
  verificarTokenJWT(token: string) {
    try {
      let decoded = jwt.verify(token, llaves.clavesecretaJWT);
      return decoded;
    } catch {
      return null;
    }

  }
}
