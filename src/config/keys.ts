export namespace keys {
  export const OrigenCorreoElectronico = 'santiago.1701621469@ucaldas.edu.co';
  export const asuntoNuevoUsuario = '[Nuevo Usuario Constructora ] Mensaje de bienvenida ';
  export const tiempoVencimientoJWT = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30);
  export const clavesecretaJWT = 'jwt@contruct@r*';
  export const twiliophone = '+19362771775';

  export const carpetaImagenCliente = '../../assets/images/cliente';
  export const nombreCampoImagenCliente = 'file';
  export const extensionesPermitidasIMG: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
  export const tamMaxImagenCliente = 1024 * 1024;

  export const carpetaImagenProyecto = '../../assets/images/proyecto';
  export const nombreImagenProyecto = 'file';
  export const extensionesPermitidasDOC: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
}
